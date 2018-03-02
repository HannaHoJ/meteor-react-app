import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
 
import TasksApi from '../api/tasks.js';
import Task from './Task.js';

 
// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props)
		this.submitForm = this.submitForm.bind(this);
		this.state = {
			text: "",
			hideCompleted: false
		}
	}
 
	renderTasks() {
		let undoneTasks = this.props.tasks;
		if(this.state.hideCompleted){
			//filter all tasks for tasks with have checked false
			undoneTasks = undoneTasks.filter(task => !task.checked);
		}
		return undoneTasks.map((task) => (
			<Task key={task._id}  task={task} />
		));
	}
 
 	submitForm(e){
 		e.preventDefault();
 		const text = this.state.text;
 		console.log(text);
 		this.setState({
		    text: ''
		});
 		
		//not on client side!!!
 		// Tasks.insert({
 		// 	text: text, //= text: text
 		// 	createdAt: new Date()
 		// })

 		//Meteor.call is optimistic
 		//sends request to server to run method(ajax)
 		//simulation of the method is run in client predicting the outcome
 		//if server response comes back and the outcome is identical it stay if not ui becomes updated
 		Meteor.call('tasks.insert', text);

 	}

	render() {
		return (
			<div className="container">
				<header>
				  <h1>Todo List</h1>
				  <h3>You have still { this.props.countUndone } Task to do</h3>
				</header>
					<label className="hide-completed">
						<input 
						type="checkbox"
						checked={this.state.hideCompleted}
						onClick={ (e) => this.setState({ hideCompleted: !this.state.hideCompleted }) }
						/>
						See only undone Tasks.
					</label>
					<form id='task-form' onSubmit={(e) => { this.submitForm(e)} }>
						<input 
							type="text" 
							ref="clear" //usage with React.findDOMNode(this.refs.<ref_value>) 
							onChange={(e) => this.setState({ text: e.target.value.trim() })} 
							placeholder="Was willst du heute machen?" 
							size='50'
							id="task-input" required/>
					</form>
				<ul>
				  {this.renderTasks()}
				</ul>
			</div>
		);
	}
}

//bit like apollo?
//DB query to list all the tasks
export default withTracker(() => {
	Meteor.subscribe('tasks');
	return {
		//defines props connected to database queries
		tasks: Tasks.api.getAll(),
		countUndone: Tasks.find({ checked: { $ne: true } }).count(),
	};
})(App);