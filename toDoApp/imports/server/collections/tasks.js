import { Mongo } from 'meteor/mongo';
//creating tasks collection 
export const Tasks = new Mongo.Collection('tasks');