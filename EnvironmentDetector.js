'use strict';

let _ = require('lodash');

class EnvironmentDetector {

  constructor(filesystem, envPath, envFile) {
    this.filesystem = filesystem;

    this.envPath = envPath;
    this.envFile = envFile;
  }

  detect(cb) {
    if (typeof this.envFile !== 'string') {
      this.envFile = '.env';
    };

    let envData = this.filesystem.get(this.envPath + this.envFile);
    let envJson = JSON.parse(envData);

    _.each(envJson.data, (value, key) => {
      process.env[key] = value;
    });

    process.nextTick(cb);
  }

}

module.exports = EnvironmentDetector;
