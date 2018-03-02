//import { Tasks } from '../../server/collections/tasks.js';


export default Tasks.api = {
	getAll: function() {
		return Tasks.find({}, { sort: {createdAt: -1} }).fetch();		
	}		
}
