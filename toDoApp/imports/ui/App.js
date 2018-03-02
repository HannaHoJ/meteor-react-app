import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js'; 
import Task from './Task.js';
 
// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props)
		this.submitForm = this.submitForm.bind(this);
		this.state = {
			text: "",
		}
	}
 
	renderTasks() {
		return this.props.tasks.map((task) => (
			<Task key={task._id} taskId={task._id} task={task} />
		));
	}
 
 	submitForm(e){
 		e.preventDefault();
 		const text = this.state.text;
 		console.log(text);
 		this.setState({
		    text: ''
		});
 		Tasks.insert({
 			text: text, //= text: text
 			createdAt: new Date()
 		})
 		
 	}

	render() {
		return (
			<div className="container">
				<header>
				  <h1>Todo List</h1>
				</header>
					<form onSubmit={(e) => { this.submitForm(e)} }>
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
  return {
  	//defines a prop tasks with can be used to map throughs
    tasks: Tasks.find({}, { sort: {createdAt: -1} }).fetch(),
  };
})(App);