'use strict';

var _ = require('lodash');

function EnvironmentDetector(filesystem, envPath, envFile) {
  this.filesystem = filesystem;

  this.envPath = envPath;
  this.envFile = envFile;
}

EnvironmentDetector.prototype.detect = function (cb) {
  if (typeof this.envFile !== 'string') {
    this.envFile = '.env';
  };

  var envData = this.filesystem.get(this.envPath + this.envFile);
  var envJson = JSON.parse(envData);

  _.each(envJson.data, function (value, key) {
    process.env[key] = value;
  });

  cb();
};

module.exports = EnvironmentDetector;