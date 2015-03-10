# Console Time
This is a small terminal utility inspired by (and using) [peerflix](https://github.com/mafintosh/peerflix).
It let's you search for a show and select one of the latest episodes (provided by RSS stream from [showRSS.info](http://showrss.info/)) to stream instantly using a magnet link.

## Prerequisites
- Node.js (with NPM)
- VLC or other video player compatible with peerflix

## Installation
To install dependencies just run `npm install` from within the repo root directory.

## Usage
`node console-time.js SHOW_TITLE [PLAYER_NAME]`
 
`SHOW_TITLE` can be just a part of the title. It can't have spaces or needs to be surrounded by quotes. 

`PLAYER_NAME` is optional for when you want to specify the video player (default: `'vlc'`)

## License
MIT