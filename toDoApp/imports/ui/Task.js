import React, { Component } from 'react'; //import react specific Modules
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';

class Task extends Component{
	constructor(props){
		super(props);
		this.deleteTask = this.deleteTask.bind(this);
		this.checkedTask = this.checkedTask.bind(this);
	}

	checkedTask(){
		// Tasks.update( this.props.taskId, {
		// 	$set: { checked: !this.props.task.checked}
		// })
		Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
	}

	deleteTask(){
		//Tasks.remove(this.props.taskId);
		Meteor.call('tasks.remove', this.props.task._id,);
	}

	render(){
		return( 
		<li className={ this.props.task.checked? 'checked': '' }> 
			<input 
			type="checkbox"
			checked={!!this.props.task.checked}
			onClick={ this.checkedTask }
			/>
			<span>{this.props.task.text } </span>
			<button onClick={ this.deleteTask } className="delete">X</button>
		</li> 
	)}
} 



export default Task;
