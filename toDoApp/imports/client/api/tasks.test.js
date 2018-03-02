//running with
//TEST_WATCH=1 meteor test --driver-package meteortesting:mocha --port 4000

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Tasks } from './tasks.js';
 
if (Meteor.isServer) {
	describe('Tasks', () => {
		describe('methods', () => {

			//const userId = Random.id();
			// let taskId;
			//sets environment for the test
			beforeEach(() => {
				//remove all tasks
				Tasks.remove({});
				//insert new task
				taskId = Tasks.insert({
					text: 'test task',
					createdAt: new Date(),
					// owner: userId,
					// username: 'tmeasday',
					});
			});
			it('can delete task', () => {

				 const deleteTask = Meteor.server.method_handlers['tasks.remove'];
 
		        // Set up a fake method invocation that looks like what the method expects
		        //const invocation = { userId };
		 
		        // Run the method with `this` set to the fake invocation
		        //deleteTask.apply(invocation, [taskId]);
		        deleteTask.apply([taskId]);
		 
		        // Verify that the method does what we expected
		        assert.equal(Tasks.find().count(), 0);
			});
		});
	});
}