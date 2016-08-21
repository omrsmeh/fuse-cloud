'use strict';

class CreateTemplates {

  handler(request, reply) {
    let newTemplate = request.server.settings.app.templates.save({
      name: 'Ravi2',
      group: 'head',
      subgroup: 'menu'
    });

    newTemplate.then((template) => {

      return reply({error: false, data: template}).code(201);

    }).catch((e) => {
      return reply({error: true, message: e}).code(200);
    })
  }
}

module.exports = new CreateTemplates();
