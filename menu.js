'use strict';

var menu = require('terminal-menu');

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

Menu.prototype.close = function () {
  this.instance.close();
  process.stdin.setRawMode(false)
};

Menu.prototype.drawEpisodesMenu = function (episodes) {
  this.instance.write('SELECT WHICH EPISODE\n');
  this.instance.write('-------------------------\n');
  episodes.forEach((function (episode, i) {
    this.instance.add(i + ' :: ' +episode.title[0])
  }).bind(this));
  this.instance.on('select', this.select);
};

Menu.prototype.drawShowsMenu = function (foundShows) {
  console.log(this.selectCallback, 'dddd')
  this.instance.write('SELECT WHICHL\n');
  this.instance.write('-------------------------\n');
  foundShows.forEach((function (show) {
    this.instance.add(show.id + ' :: ' + show.name)
  }).bind(this));
  this.instance.on('select', this.select);
};

module.exports = Menu;