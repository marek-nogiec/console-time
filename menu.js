'use strict';

var menu = require('terminal-menu');

/**
 * Helper function
 * @param {string} string to capitalize
 * @returns {string} capitalized string
 */
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Initialize menu with a list of shows/episodes
 * @param {string} type choose if passing shows or episodes
 * @param {Object[]} list list of shows or episodes to display
 * @param {Function} select callback when something is selected
 * @constructor
 */
function Menu (type, list, select) {
  this.select = function() {
      select.apply(this, arguments);
      this.close()
  };
  this.instance = menu({ width: 80, x: 4, y: 2 });
  this.instance.reset();
  console.log('s', select);
  this['draw' + capitalize(type) +  'Menu'](list);

  process
    .stdin
    .pipe(this.instance.createStream())
    .pipe(process.stdout);
  process
    .stdin
    .setRawMode(true);
}
/**
 * Close the menu and disable rawMode
 */
Menu.prototype.close = function () {
  this.instance.close();
  process.stdin.setRawMode(false)
};

/**
 * Process list of episodes and display them
 * @param episodes
 */
Menu.prototype.drawEpisodesMenu = function (episodes) {
  this.instance.write('SELECT WHICH EPISODE\n');
  this.instance.write('-------------------------\n');
  episodes.forEach((function (episode, i) {
    this.instance.add(i + ' :: ' +episode.title[0])
  }).bind(this));
  this.instance.on('select', this.select);
};

/**
 * Process list of shows and display them
 * @param shows
 */
Menu.prototype.drawShowsMenu = function (shows) {
  this.instance.write('SELECT WHICHL\n');
  this.instance.write('-------------------------\n');
  shows.forEach((function (show) {
    this.instance.add(show.id + ' :: ' + show.name)
  }).bind(this));
  this.instance.on('select', this.select);
};

module.exports = Menu;