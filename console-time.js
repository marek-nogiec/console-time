/**
 * External libraries
 * @type {exports}
 */
var http = require('http');
var parseString = require('xml2js').parseString;

/**
 * Load local modules
 */
var openStream = require('./stream').openStream;
var Menu = require('./menu');

/**
 * List of shows and their IDs used for
 * showrss.info RSS feeds
 * @type {exports}
 */
var showList = require('./show-list.json');

/**
 * RSS feeds base URL
 * @type {string}
 */
var RSS_URL = 'http://showrss.info/feeds/';

/**
 * Use first argument as show name
 */
var name = process.argv[2];

/**
 * Use second argument as player
 * @type {string}
 */
var player = process.argv[3] || 'vlc';

/**
 * Store episodes
 */
var episodes;

/**
 * Find show matching provided name
 * @param {string} name
 */
function findShows(name) {
  var foundShows = showList.filter(function (item) {
    return new RegExp(name, 'i').test(item.name);
  });
  if (foundShows.length > 1) {
    new Menu('shows', foundShows, onShowSelect)
  } else if (foundShows.length === 1) {
    getShowLink(foundShows[0].id)
  }
}

findShows(name);

/**
 * Extract ID and pass show link to get RSS
 * @param label
 */
function onShowSelect (label) {
  var id = label.replace(/\s.+/, '');
  getShowLink(id);
}


/**
 * Retrieves RSS feed with a list of episodes
 * @param id
 */
function getShowLink (id) {
  var url = RSS_URL + id + '.rss';
  var request = http.get(url, function (res){
    var xml = [];
    res.on('data', function (chunk) {
      xml.push(chunk);
    });
    res.on('end', function () {
      xml = xml.join('');
      parseString(xml, processEpisodes);
    })
  })
}

/**
 * Extracts magnet link based on selected episodes
 * and passes it to open stream
 * @param label
 */
function onEpisodeSelect (label) {
  var i = label.replace(/\s.+/, '');
  var magnetLink = episodes[i].link[0];
  openStream(magnetLink, player);
}

/**
 * Callback for RSS feed request.
 * Extracts episodes list from RSS
 * and shows them in the menu.
 * @param err
 * @param result
 */
function processEpisodes (err, result) {
  if (err) {
    throw new Error(err);
  }
  episodes = result.rss.channel[0].item;
  new Menu('episodes', episodes, onEpisodeSelect)
}

