'use strict';
var uuid = require('uuid');
module.exports = function (config) {

  function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  }

  return function (req, res, next) {
    var id = uuid.v4();//very random id
    //get or set request id
    if (!has(config, 'header') || !has(config, 'prefix')) {
      throw new Error('Invalid config for express-pass-id');
    }
    if (has(req.headers, config.header))
      req.id = req.headers[config.header];
    else
      req.id = config.prefix + ':' + id;
    req.passHeaders = {};
    req.passHeaders[config.header] = req.id;
    next();
  };

};
