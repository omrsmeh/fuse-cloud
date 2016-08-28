'use strict';

let _ = require('lodash');

class UpdateTemplates {

  handler(request, reply) {
    let newTemplate = request.server.settings.app.templates.findOne({
      "_id": request.payload.id+''
    });

    newTemplate.then((template) => {
      template.increment();
      template = _.merge(template, request.payload);
      // template.name      = request.payload.name;
      // template.group     = request.payload.group;
      // template.subgroup  = request.payload.subgroup;
      // template.content   = request.payload.content;
      // template.viewareas = request.payload.viewareas;
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
