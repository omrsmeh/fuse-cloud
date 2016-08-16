'use strict';

const AuthValidator = function (decoded, request, callback) {
  // do your checks to see if the person is valid
  if (!people[decoded.id]) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
};

module.exports = AuthValidator;
