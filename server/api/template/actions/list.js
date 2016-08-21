'use strict';

class ListTemplates {

  handler(request, reply) {

    let headers = request.server.settings.app.templates.findHeaders();
    headers.then((t) => {
      return reply({error: false, data: t}).code(200);
    })
    .catch((e) => {
      return reply({error: true, message: e}).code(200);
    })
  }
}

module.exports = new ListTemplates();
