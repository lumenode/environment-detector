'use strict';

require('should');
let sinon = require('sinon');
let EnvironmentDetector = require('../EnvironmentDetector');

describe('<Unit Test>', () => {
  describe('EnvironmentDetector Spec', () => {

    it('loades data into process.env', done => {
      let filesystem = {get: () => {}};
      let mock = sinon.mock(filesystem);
      let data = {
        "data": {
          "testing_1": "1",
          "testing_2": "2",
          "testing_3": "3"
        }
      };

      mock.expects('get').once().returns(JSON.stringify(data));

      let detector = new EnvironmentDetector(filesystem, __dirname + '/', 'testing.env');
      detector.detect(() => {
        process.env.should.have.properties([
          'testing_1',
          'testing_2',
          'testing_3'
        ]);

        process.env.testing_1.should.be.equal('1');
        process.env.testing_2.should.be.equal('2');
        process.env.testing_3.should.be.equal('3');

        mock.verify();
        done();
      });
    });

  });
});
