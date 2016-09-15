'use strict';

class AuthLocal {

  handler(request, reply) {
    console.log(!request.auth, request.auth);
    return reply({
      params: request.params,
      payload: request.payload,
      body: request.body
    }).code(200);
  }
}

module.exports = new AuthLocal();
