'use strict';

let ApiBaseActions = require('./../../apibase.actions');

class BaseTemplateActions extends ApiBaseActions {

  constructor(request, reply) {
    this.dbResorce = request.server.settings.app.templates;
    super(request, reply);
  }
  
  get resources() {
    return this.dbResorce
  }
}

module.exports = BaseTemplateActions;
