import { Meteor } from 'meteor/meteor';
import '../imports/server/collections/tasks.js';
import '../imports/server/methods/tasks-methods.js';
import '../imports/server/publications/tasks-publications.js';

Meteor.startup(() => {
  // code to run on server at startup
});
