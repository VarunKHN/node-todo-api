// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) =>{

if(err){
    return console.log('Unable to connect to MongoDB server.');
}
console.log('Connected to MongoDB server.');

// db.collection('Todos').findOneAndUpdate({
//     _id : new ObjectID('5aa90f53763c03aa8fa7e5ad')
// }, {
//     $set : {
//         completed : false
//     }
// },{
//     returnOriginal : false
// }).then((result) =>{
//     console.log(result);
// });

db.collection('Users').findOneAndUpdate({
    _id : new ObjectID('5aa92f07763c03aa8fa7ed69')
}, {
    $set : {
        name : "Varun"
    },
    $inc :{
        age : 1
    }
},{
    returnOriginal : false
}).then((result) =>{
    console.log(result);
});

// db.close();

})