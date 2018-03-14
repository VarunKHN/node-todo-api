// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) =>{

if(err){
    return console.log('Unable to connect to MongoDB server.');
}
console.log('Connected to MongoDB server.');

// db.collection('Users').deleteMany({name:"Varun"}).then((res) =>{
//     console.log(res);
// });

// db.collection('Todos').deleteOne({text:"Eat shit"}).then((res) =>{
//     console.log(res);
// });

// db.collection('Todos').findOneAndDelete({text:"Eat shit"}).then((res) =>{
//     console.log(res);
// });

db.collection('Users').findOneAndDelete({_id: new ObjectID('5aa930fa763c03aa8fa7edfc')}).then((res) =>{
    console.log(res);
});


// db.close();

})