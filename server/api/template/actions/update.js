'use strict';

class UpdateTemplates {

  handler(request, reply) {
    let newTemplate = request.server.settings.app.templates.findOne({
      name: 'Ravi2',
      group: 'header',
      subgroup: 'menu'
    });

    newTemplate.then((template) => {
      template.increment();
      return template.save();
    })
    .then((t) => {
      return reply({error: false, data: t}).code(200);
    })
    .catch((e) => {
      return reply({error: true, message: e}).code(200);
    })
  }
}

module.exports = new UpdateTemplates();
