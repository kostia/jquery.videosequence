$(function() {
  var loadFileFromSource = function(source, next) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', source, true);
    xhr.responseType = 'arraybuffer';
    xhr.send();

    xhr.onload = function() {
      var uint8array = new Uint8Array(xhr.response);
      var file = new Blob([uint8array], {type: 'video/webm'});
      next(file);
    };
  };

  var addFileToSourceBuffer = function(sourceBuffer, file, timestampOffset, next) {
    var reader = new FileReader();

    reader.onload = function(e) {
      sourceBuffer.timestampOffset = timestampOffset;
      sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
      if (next) {
        next();
      }
    };

    reader.readAsArrayBuffer(file);
  };

  var addSourceToBuffer = function(sourceBuffer, source, timestampOffset, next) {
    loadFileFromSource(source, function(file) {
      addFileToSourceBuffer(sourceBuffer, file, timestampOffset, next);
    });
  };

  var addSourcesToMediaSource = function(mediaSource, specs, mimeType) {
    mediaSource.addEventListener('sourceopen', function() {
      var sourceBuffer = mediaSource.addSourceBuffer(mimeType);

      var initialSpec = specs.shift();
      var initialSource = initialSpec.source;
      var initialTimestampOffset = initialSpec.timestampOffset;

      addSourceToBuffer(sourceBuffer, initialSource, initialTimestampOffset, function() {
        sourceBuffer.addEventListener('updateend', function() {
          if (specs.length > 0) {
            var spec = specs.shift();
            var source = spec.source;
            var timestampOffset = spec.timestampOffset;

            addSourceToBuffer(sourceBuffer, source, timestampOffset);
          }
        });
      });
    });
  };

  var addSourcesToMediaElement = function(mediaElement, specs, mimeType) {
    var mediaSource = new MediaSource();
    mediaElement.src = window.URL.createObjectURL(mediaSource);
    addSourcesToMediaSource(mediaSource, specs, mimeType);
  };

  var assertTagName = function(jqueryElement, methodName, tagName) {
    if (jqueryElement.prop('tagName') !== tagName) {
      $.error('Called $.' + methodName + ' on a non ' + tagName + ' tag.');
    }
  };

  $.fn.videosequence = function(specs) {
    assertTagName(this, 'videosequence', 'VIDEO');
    addSourcesToMediaElement(this[0], specs, 'video/webm; codecs="vorbis,vp8"');
  };

  $.fn.audiosequence = function(specs) {
    assertTagName(this, 'audiosequence', 'AUDIO');
    addSourcesToMediaElement(this[0], specs, 'audio/webm; codecs="vorbis"');
  };
});
