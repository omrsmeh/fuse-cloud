'use strict';

let ApiBaseActions = require('./../../apibase.actions');

class AuthLocal extends ApiBaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  processRequest() {
    console.log(!super.isAuthenticated, super.isAuthenticated);
    return super.response(200, {
      params: super.requestQuery,
      payload: super.requestParams,
      body: super.requestBody
    });
  }
}

module.exports = (request, reply) => {
  let creator = new AuthLocal(request, reply);
  creator.processRequest();
}
