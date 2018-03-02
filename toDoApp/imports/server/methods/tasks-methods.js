import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


Meteor.methods({
	'tasks.insert'(text) {
		//typechecking
		check(text, String);

		// Make sure the user is logged in before inserting a task
		// if (! this.userId) {
		//   throw new Meteor.Error('not-authorized');
		// }
		console.log("before insert");
		//Create document and insert it in collection
		Tasks.insert({
		  	text,
		  	createdAt: new Date(),
		  	//owner: this.userId,
		  	//username: Meteor.users.findOne(this.userId).username,
		});
		console.log('after insert')

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