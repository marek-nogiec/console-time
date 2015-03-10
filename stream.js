'use strict';

/**
 * Launches peerflix with proper parameters
 * @param {string} magnetLink
 * @param {string} player
 */
module.exports.openStream = function (magnetLink, player) {
  var sys = require('sys');
  var exec = require('child_process').exec;
  function puts(error, stdout, stderr) {
    sys.puts(stdout)
  }
  var cmdToRun = 'node_modules/.bin/peerflix \''+ magnetLink + '\''+ ' --' + player + '\n';

  var child = exec(cmdToRun);

  child.stdout.pipe(process.stdout);
}