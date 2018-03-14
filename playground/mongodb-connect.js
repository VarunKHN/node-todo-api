// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);
// var userObj = {name:'VArun', age:'28'};
// var {name} = userObj;

// console.log(name);

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) =>{

if(err){
    return console.log('Unable to connect to MongoDB server.');
}
console.log('Connected to MongoDB server.');

// db.collection('Todos').insertOne({
//     text:"Something to do",
//     completed:false
// },(err,res) =>{
//     if(err){
//         return console.log('Unable to insert', err);
//     }
//     console.log(JSON.stringify(res.ops, undefined, 2));
// });

// db.collection('Users').insertOne({
//     name:"Varun",
//     age:28,
//     location:"Mangalore"
// },(err,res) =>{
//     if(err){
//         return console.log('Unable to insert', err);
//     }
//     console.log(res.ops[0]._id.getTimestamp());
// });

db.close();

})