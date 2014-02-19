window = require('jsdom').jsdom().createWindow();
document = window.document;
jQuery = require('jquery');
$ = jQuery;
jqueryJasmine = require('jasmine-jquery');

require('../jquery.videosequence');

describe('$.videosequence, $.audiosequence', function() {
  beforeEach(function() {
    setFixtures(
      '<div id="jasmine-fixtures">' +
        '<div id="wrong-tag"></div>' +
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
});
