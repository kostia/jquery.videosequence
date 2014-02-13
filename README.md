jquery.videosequence
====================

jQuery plugin for creating a video sequence with media source extensions.

## Prerequisites

To avoid stress, please read before using http://wiki.webmproject.org/adaptive-streaming/instructions-to-playback-a-webm-dash-presentation.

## Installation

```
bower install jquery.videosequence
```

## Usage

```javascript
$('video').videosequence([
  {source: 'xxx-0s-3s.webm', timestampOffset: 0)},
  {source: 'xxx-3s-6s.webm', timestampOffset: 3)},
  {source: 'xxx-6s-9s.webm', timestampOffset: 6)}
]);
```
