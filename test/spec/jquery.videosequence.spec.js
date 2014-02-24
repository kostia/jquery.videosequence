window = require('jsdom').jsdom().createWindow();
document = window.document;
jQuery = require('jquery');
$ = jQuery;
jqueryJasmine = require('jasmine-jquery');

require('../../jquery.videosequence');

describe('$.videosequence, $.audiosequence', function() {
  beforeEach(function() {
    setFixtures(
      '<div id="jasmine-fixtures">' +
        '<div id="wrong-tag"></div>' +
        '<video data-rel="videosequence"' +
          ' data-videosequence-sources=\'["video-1.webm","video-2.webm"]\'' +
          ' data-videosequence-offsets=\'[0,3]\'>' +
        '</video>' +
        '<audio data-rel="audiosequence"' +
          ' data-audiosequence-sources=\'["audio-1.webm","audio-2.webm"]\'' +
          ' data-audiosequence-offsets=\'[6,9]\'>' +
        '</audio>' +
      '</div>'
    );
  });

  it('raises an error if called on a wrong tag', function() {
    expect(function() {
      $('#wrong-tag').videosequence({});
    }).toThrow('Called $.videosequence on a non VIDEO tag.');

    expect(function() {
      $('#wrong-tag').audiosequence({});
    }).toThrow('Called $.audiosequence on a non AUDIO tag.');
  });

  describe('with data-attrs', function() {
    beforeEach(function() {
      spyOn($.prototype, 'videosequence');
      spyOn($.prototype, 'audiosequence');
    });

    it('takes the values from them', function() {
      $(document).trigger('videosequence:initialize');
      expect($.prototype.videosequence).toHaveBeenCalledWith([
        {source: 'video-1.webm', timestampOffset: 0},
        {source: 'video-2.webm', timestampOffset: 3}
      ]);

      $(document).trigger('audiosequence:initialize');
      expect($.prototype.audiosequence).toHaveBeenCalledWith([
        {source: 'audio-1.webm', timestampOffset: 6},
        {source: 'audio-2.webm', timestampOffset: 9}
      ]);
    });
  });
});