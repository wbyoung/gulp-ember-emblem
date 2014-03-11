'use strict';

var emberEmblemPlugin = require('../');
var should = require('should');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
require('mocha');

var getFixture = function(filePath) {
  filePath = path.join('test', 'fixtures', filePath);
  return new gutil.File({
    path: filePath,
    cwd: path.join('test', 'fixtures'),
    base: path.dirname(filePath),
    contents: fs.readFileSync(filePath)
  });
};

var getExpectedString = function(filePath) {
  return fs.readFileSync(path.join('test', 'expected', filePath), 'utf8');
};

var fileMatchesExpected = function(file, fixtureFilename) {
  path.basename(file.path).should.equal('basic.js');
  String(file.contents).should.equal(getExpectedString(fixtureFilename));
};

describe('gulp-ember-emblem', function() {
  describe('emberEmblemPlugin()', function() {

    it('should emit an error when compiling invalid templates', function(done) {
      var stream = emberEmblemPlugin();
      var invalidTemplate = getFixture('invalid.em');

      stream.on('error', function(err) {
        err.should.be.an.instanceOf(Error);
        err.message.should.equal("Emblem syntax error, line 2: " +
          "Expected BeginStatement or " +
          "DEDENT but \"\\uEFEF\" found.\n  because\n^");
        done();
      });

      stream.write(invalidTemplate);
      stream.end();
    });

    it('should compile templates', function(done) {
      var stream = emberEmblemPlugin();
      var basicTemplate = getFixture('basic.em');

      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        fileMatchesExpected(newFile, 'basic.js');
        done();
      });
      stream.write(basicTemplate);
      stream.end();
    });

    it('should compile multiple templates', function(done) {
      var stream = emberEmblemPlugin();
      var basicTemplate = getFixture('basic.em');
      var basicTemplate2 = getFixture('basic.em');

      var count = 0;
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        fileMatchesExpected(newFile, 'basic.js');

        count += 1;
        if (count === 2) {
          done();
        }
      });
      stream.write(basicTemplate);
      stream.write(basicTemplate2);
      stream.end();
    });
  });
});
