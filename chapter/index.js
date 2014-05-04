'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');


var ChapterGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('This wizard will now create a new chapter...' + this.name + '.');
  },

  askFor: function () {
  var cb = this.async();

  // welcome message
  if (!this.options['skip-welcome-message']) {
    this.yeoman += "... CYO Edition";
    console.log(this.yeoman);
  }

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What does your chapter include?',
    choices: [{
      name: 'A way to get to the next chapter (choice)',
      value: 'includeChoice',
      checked: true
    },{
      name: 'Something special that happens (event)',
      value: 'includeEvent',
      checked: false
    },{
      name: 'A paragraph that only appears if certain events have occured (condition)',
      value: 'includeCondition',
      checked: false
    },{
      name: 'A picture',
      value: 'includePicture',
      checked: false
    }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) {
      return features.indexOf(feat) !== -1;
    }

    this.includeChoice = hasFeature('includeChoice');
    this.includeEvent = hasFeature('includeEvent');
    this.includeCondition = hasFeature('includeCondition');
    this.includePicture = hasFeature('includePicture');

    cb();
  }.bind(this));
},

  files: function () {
    this.template('_page.html', 'story/page.html');

  }
});

module.exports = ChapterGenerator;