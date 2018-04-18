const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) =>{
//     console.log(result);
// });

Todo.findOneAndRemove({_id:'5ad6ce1000ed397cb414cb44'}).then((doc) =>{

});

Todo.findByIdAndRemove('5ad6ce1000ed397cb414cb44').then((doc) =>{
    console.log(doc);
});