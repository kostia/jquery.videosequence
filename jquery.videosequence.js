;(function($) {
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
      assertValidSpec(initialSpec);

      var initialSource = initialSpec.source;
      var initialTimestampOffset = initialSpec.timestampOffset;

      addSourceToBuffer(sourceBuffer, initialSource, initialTimestampOffset, function() {
        sourceBuffer.addEventListener('updateend', function() {
          if (specs.length > 0) {
            var spec = specs.shift();
            assertValidSpec(spec);

            var source = spec.source;
            var timestampOffset = spec.timestampOffset;

            addSourceToBuffer(sourceBuffer, source, timestampOffset);
          } else {
            mediaSource.endOfStream();
          }
        });
      });
    });
  };

  var addSourcesToMediaElement = function(mediaElement, specs, mimeType) {
    if (specs.length === 0) {
      return console.warn('Trying to create mediasequence with empty specs.');
    }

    var mediaSource = new window.MediaSource();
    mediaElement.src = window.URL.createObjectURL(mediaSource);
    addSourcesToMediaSource(mediaSource, specs, mimeType);
  };

  var assertTagName = function(jqueryElement, methodName, tagName) {
    if (jqueryElement.prop('tagName') !== tagName) {
      $.error('Called $.' + methodName + ' on a non ' + tagName + ' tag.');
    }
  };

  var assertSpecsGiven = function(specs, methodName) {
    if (!specs) {
      $.error('Called $.' + methodName + ' with no specs given.');
    }
  };

  var assertValidSpec = function(spec) {
    if (!spec.source) {
      $.error('Tried to create a mediasequence with a spec missing "source" key.');
    }
  };

  var parseDataAttr = function(jqueryElement, dataAttrPrefix, attrName) {
    return JSON.parse(jqueryElement.attr(dataAttrPrefix + attrName));
  };

  var parseSpecsFromDataAttrs = function(tagName, jqueryElement) {
    var dataAttrPrefix = 'data-' + tagName + 'sequence-';
    var sources = parseDataAttr(jqueryElement, dataAttrPrefix, 'sources');
    var offsets = parseDataAttr(jqueryElement, dataAttrPrefix, 'offsets');

    var specs = [];
    $.each(sources, function(index, source) {
      var timestampOffset = offsets[index];
      specs.push({source: source, timestampOffset: timestampOffset});
    });
    return specs;
  };

  var createSequence = function(tagName, jqueryElement, specs, codecInfo) {
    var methodName = tagName + 'sequence';
    assertTagName(jqueryElement, methodName, tagName.toUpperCase());
    assertSpecsGiven(specs, methodName);
    addSourcesToMediaElement(jqueryElement[0], specs, codecInfo);
    return jqueryElement;
  };

  $.fn.videosequence = function(specs) {
    return createSequence('video', this, specs, 'video/webm; codecs="vorbis,vp8"');
  };

  $.fn.audiosequence = function(specs) {
    return createSequence('audio', this, specs, 'audio/webm; codecs="vorbis"');
  };

  var initializeMediasequencesFor = function(tagName) {
    var sequenceName = tagName + 'sequence';
    $.each($('[data-rel="' + tagName + 'sequence"]'), function(index, domElement) {
      var jqueryElement = $(domElement);
      var specs = parseSpecsFromDataAttrs(tagName, jqueryElement);
      jqueryElement[sequenceName].call(jqueryElement, specs);
    });
  };

  var initializeMediasequences = function() {
    initializeMediasequencesFor('video');
    initializeMediasequencesFor('audio');
  };

  $(initializeMediasequences);

  $(document).on('videosequence:initialize', initializeMediasequences);
  $(document).on('audiosequence:initialize', initializeMediasequences);
})(jQuery);
