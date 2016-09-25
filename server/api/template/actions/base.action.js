'use strict';

let ApiBaseActions = require('./../../apibase.actions');

class BaseTemplateActions extends ApiBaseActions {

  constructor(request, reply) {
    super(request, reply);
    this.dbResorce = request.server.settings.app.templates;
  }

  get resources() {
    return this.dbResorce
  }
}

module.exports = BaseTemplateActions;
