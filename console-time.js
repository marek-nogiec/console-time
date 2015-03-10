var http = require('http');
var parseString = require('xml2js').parseString;

// local modules
var openStream = require('./stream').openStream;
var Menu = require('./menu');

// resources
var showList = require('./show-list.json');
var RSS_URL = 'http://showrss.info/feeds/';
var name = process.argv[2];

var player = process.argv[3] || 'vlc';

var episodes;

var foundShows = showList.filter(function (item) {
  return new RegExp(name, 'i').test(item.name);
});

if (foundShows.length > 1) {
  new Menu('shows', foundShows, onShowSelect)
} else if (foundShows.length === 1) {
  getShowLink(foundShows[0].id)
}

function onShowSelect (label) {
  var id = label.replace(/\s.+/, '');
  getShowLink(id);
}

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

function onEpisodeSelect (label) {
  var i = label.replace(/\s.+/, '');
  var magnetLink = episodes[i].link[0];
  openStream(magnetLink, player);
}

function processEpisodes (err, result) {
  episodes = result.rss.channel[0].item;
  new Menu('episodes', episodes, onEpisodeSelect)
}

function closeMenu () {
  menu.close();
  process.stdin.setRawMode(false);

}

