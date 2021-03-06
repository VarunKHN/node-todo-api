const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
var {ObjectID} = require('mongodb');

const todos = [{
    _id : new ObjectID(),
    text : 'First test todo'
},{
    _id : new ObjectID(),
    text : 'Second test todo',
    completed : true,
    completedAt : 123
}]

beforeEach((done) =>{
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todo', () => {
    it('should create a new todo', (done)=>{
        var text = 'Some new todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) =>{
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos) =>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done)=>{
        var text = '';

        request(app)
        .post('/todos')
        .send({text})
        .expect(400)
        .end((err, res) =>{
            if(err){
                return done(err);
            }

            Todo.find().then((todos) =>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });

});

describe('GET /todos', () =>{
    it('should get all todos',(done) =>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () =>{
    it('should return a todo doc', (done) =>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) =>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done)=>{
        var newId = new ObjectID();
        request(app)
        .get(`/todos/${newId.toHexString()}`)
        .expect(404)
        .end(done);
    })

    it('should return 404 for non object id\'s', (done)=>{
        var newId = '1234';
        request(app)
        .get(`/todos/${newId}`)
        .expect(404)
        .end(done);
    })
});

describe('DELETE /todos/:id', () =>{
   
    it('Should remove a todo', (done) =>{
        var hexID = todos[1]._id.toHexString();
        
        request(app)
        .delete(`/todos/${hexID}`)
        .expect(200)
        .expect((res) =>{
            expect(res.body.todo._id).toBe(hexID);
        })
        .end((err,res) =>{
            Todo.findById(hexID).then((doc) =>{
                expect(doc).toNotExist();
                done();
            },(e) => done(e));
        });
    });

    it('Should return 404 if todo not found', (done) =>{
        var newId = new ObjectID();
        request(app)
        .delete(`/todos/${newId.toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non object id\'s', (done) =>{
        var newId = '1234';
        request(app)
        .delete(`/todos/${newId}`)
        .expect(404)
        .end(done);
    });

});


describe('PATCH /todos/:id', () =>{

    it('should update the todo', (done) =>{
        var hexID = todos[0]._id.toHexString();
        var newText = 'new';
        request(app)
        .patch(`/todos/${hexID}`)
        .send({text:newText,completed:true})
        .expect(200)
        .expect((res) =>{
            expect(res.body.todo.text).toBe(newText);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });

    it('should clear completed at when todo not completed', (done) =>{
        var hexID = todos[1]._id.toHexString();
        var newText = 'new text';
        request(app)
        .patch(`/todos/${hexID}`)
        .send({text:newText,completed:false})
        .expect(200)
        .expect((res) =>{
            expect(res.body.todo.text).toBe(newText);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    })
});