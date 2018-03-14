// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) =>{

if(err){
    return console.log('Unable to connect to MongoDB server.');
}
console.log('Connected to MongoDB server.');

// db.collection('Todos').find({_id: new ObjectID('5aa8fa1e466e3fb8fb10d727')}).toArray().then((docs) =>{
//     console.log('Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
// },(err) =>{
//     console.log('Unable to fetch todos', err);
// });

// db.collection('Todos').find().count().then((count) =>{
//     console.log('Todos');
//     console.log(count);
// },(err) =>{
//     console.log('Unable to fetch todos', err);
// });

db.collection('Users').find({name:"Varun"}).toArray().then((docs) =>{
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
},(err) =>{
    console.log('Unable to fetch todos', err);
});

// db.close();

})