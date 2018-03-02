import { Meteor } from 'meteor/meteor';
import { Tasks } from '../collections/tasks.js';


if(Meteor.isServer){
	Meteor.publish('tasks', () => { return Tasks.find() })
}