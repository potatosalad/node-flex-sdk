/*
 * flex-sdk
 * https://github.com/JamesMGreene/node-flex-sdk
 *
 * Copyright (c) 2013 James M. Greene
 * Licensed under the MIT license.
 */

/*
 * This simply corrects the execute permissions on the SDK binaries.
 */

'use strict';

var flexSdk = require('./lib/flex');
var fs = require('fs');

// Ensure that the binaries are user-executable (i.e. Linux shell scripts if published from Windows)
if (process.platform !== 'win32') {
  Object.keys(flexSdk.bin).forEach(function(binKey) {
    var binaryPath = flexSdk.bin[binKey];
    var stat = fs.statSync(binaryPath);
    // 64 === 0100 (no octal literal in strict mode)
    if (!(stat.mode & 64)) {
      console.log('Fixing file permissions for: ' + binaryPath);
      fs.chmodSync(binaryPath, '755');
    }
  });
}

process.exit(0);