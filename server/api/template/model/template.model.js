'use strict';

const ALLOWED_GROUPS = Object.freeze({
  'header': 'Page Header Section',
  'footer': 'Page Footer Section',
  'body'  : 'Page Content Section',
  'plugin': 'HTML + CSS + JS Plugins'
});

class DataTemplates {

  constructor(server) {
    let connection = server.connection;
    let mongoose   = server.lib;
    let Schema     = mongoose.Schema;

    let templateSchema = new Schema({
      name: { type: String },
      group: { type: String },
      subgroup: { type: String },
      content: {
        html: { type: String, "default": "" },
        css: { type: String, "default": "" },
        js: { type: String, "default": "" },
        engine: { type: String, "default": "" }
      },
      viewareas: []
    }, {
      minimize: false,
      timestamps: true,
      versionKey: '_templateVersion'
    });

    this.dataTemplate = connection.model('DataTemplate', templateSchema);
  }

  getAllGroups() {
    return ALLOWED_GROUPS;
  }

  find(query) {
    return this.dataTemplate.find(query);
  }

  findOne(query) {
    return this.dataTemplate.findOne(query);
  }

  findHeaders() {
    return this.find({group: 'header'});
  }

  findFooters() {
    return this.find({group: 'footer'});
  }

  findBody() {
    return this.find({group: 'body'});
  }

  findByGroup(groupName) {
    return this.find({group: groupName});
  }

  findBySubGroup(subGroupName) {
    return this.find({subgroup: subGroupName});
  }

  save(newValue) {
    let template = new this.dataTemplate(newValue);
    return template.save();
  }
}

module.exports = DataTemplates;
