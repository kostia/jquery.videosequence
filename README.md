jquery.videosequence
====================

jQuery plugin for creating video and audio sequences with [media source extensions](https://dvcs.w3.org/hg/html-media/raw-file/tip/media-source/media-source.html).

## Prerequisites

To avoid stress, please read before using http://wiki.webmproject.org/adaptive-streaming/instructions-to-playback-a-webm-dash-presentation.

## Installation

```
bower install jquery.videosequence
```

## Usage

```javascript
$('video').videosequence([
  {source: '/video-1.webm', timestampOffset: 0},
  {source: '/video-2.webm', timestampOffset: 10},
  {source: '/video-3.webm', timestampOffset: 20}
]);

$('audio').audiosequence([
  {source: '/audio-1.webm', timestampOffset: 0},
  {source: '/audio-2.webm', timestampOffset: 10},
  {source: '/audio-3.webm', timestampOffset: 20}
]);
```

## Test

* Install Node.js

```bash
# For example with Homebrew (http://brew.sh/)
brew install nodejs
```

* Install NPM modules

```bash
# In jquery.videosequence
npm install
npm install -g bower
```

* Install Bower components

```bash
# In jquery.videosequence
bower install
```

* Start test app server

```bash
# In jquery.videosequence
node app.js
```

* Open [http://localhost:3000](http://localhost:3000) in a browser supporting media source extensions. You should see a movie counter starting with 5 and counting down to 1 (the "1" is not actually displayed, but an empty square instead).

## MIT-License

Copyright 2014 Kostiantyn Kahanskyi

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
