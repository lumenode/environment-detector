'use strict';

require('should');
var sinon = require('sinon');
var EnvironmentDetector = require('../EnvironmentDetector');

describe('<Unit Test>', function () {
  describe('EnvironmentDetector Spec', function () {

    it('loades data into process.env', function (done) {
      var filesystem = require('fs');
      var mock = sinon.mock(filesystem);
      var data = {
        "data": {
          "testing_1": "1",
          "testing_2": "2",
          "testing_3": "3"
        }
      };

      mock.expects('readFileSync').once().returns(JSON.stringify(data));

      var detector = new EnvironmentDetector(filesystem, __dirname + '/', 'testing.env');
      detector.detect(function() {
        process.env.should.have.properties([
          'testing_1',
          'testing_2',
          'testing_3'
        ]);

        process.env.testing_1.should.be.equal('1');
        process.env.testing_2.should.be.equal('2');
        process.env.testing_3.should.be.equal('3');

        done();
      });

      mock.verify();
    });

  });
});
