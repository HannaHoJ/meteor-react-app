import React, { Component } from 'react'; //import react specific Modules

// export default class Task extends Component{

// 	render(){
// 		return(
// 			<li>
// 				{ this.props.task.text }
// 			</li>
// 		)
// 	}
// } 

const Task = (props) => { 
	return <li> {props.task.text } </li> 
}

export default Task;
