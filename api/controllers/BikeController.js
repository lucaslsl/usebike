'use strict';
var moment = require('moment');
var reqlib = require('app-root-path').require;
var wrap = reqlib('api/util/generatorFnToMiddlewareFnWrapper');

module.exports = {
  count: wrap(function* (req, res) {
    let total = yield Bike.count();
    res.status(200).json({total: total});
  }),
}