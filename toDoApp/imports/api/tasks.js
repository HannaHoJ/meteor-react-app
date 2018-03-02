import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

//creating tasks collection 
export const Tasks = new Mongo.Collection('tasks');

if(Meteor.isServer){
	Meteor.publish('tasks', () => { Tasks.find() })
}

Meteor.methods({
	'tasks.insert'(text) {
		//typechecking
		check(text, String);

		// Make sure the user is logged in before inserting a task
		// if (! this.userId) {
		//   throw new Meteor.Error('not-authorized');
		// }

		//Create document and insert it in collection
		Tasks.insert({
		  	text,
		  	createdAt: new Date(),
		  	//owner: this.userId,
		  	//username: Meteor.users.findOne(this.userId).username,
		});
	},

	'tasks.remove'(taskId) {

		//Delete document from collection
		Tasks.remove(taskId);
	},

	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);
		//Update Collection 
		Tasks.update(taskId, { $set: { checked: setChecked } });
	},
});