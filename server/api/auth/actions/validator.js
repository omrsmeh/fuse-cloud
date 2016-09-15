'use strict';

const AuthValidator = function (decoded, request, callback) {
  console.log(request, decoded);
  return callback(null, true)
};

module.exports = AuthValidator;
