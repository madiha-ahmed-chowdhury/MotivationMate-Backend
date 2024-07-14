const asyncHanlder = require("express-async-handler");
const todoModel = require("../models/todoModel");

//@desc get all todo items
//@route GET /api/todo
//@access private
const getTodos = asyncHanlder(async (req, res) => {
    const Todos = await todoModel.find({user_id:req.user.id});
    res.status(200).json(Todos);
});

//@desc get todo item
//@route GET /api/todo/:id
//@access private
const getTodo = asyncHanlder(async (req, res) => {
    const Todo = await todoModel.findById(req.params.id);
    if (!Todo) {
        res.status(404);
        throw new Error("Todo item not found");
    }
    res.status(200).json(Todo);
});

//@desc get todo item
//@route GET /api/todo/title/:title
//@access private
const getTodoByTitle = asyncHanlder(async (req, res) => {
    const title = req.params.title;
    const todo = await todoModel.findOne({ title });

    if (!todo) {
        res.status(404);
        throw new Error("Todo item not found");
    }

    res.status(200).json(todo);
});

//@desc post todo item
//@route Post /api/todo
//@access private
const postTodo = asyncHanlder(async (req, res) => {
    console.log("The request body is :", req.body);
    const { title, description } = req.body;
    if (!title) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const Todo = await todoModel.create(
        {
            title,
            description,
            user_id:req.user.id,
            done:false
        }
    )
    res.status(201).json(Todo);
});

//@desc update todo item
//@route Put /api/todo/:id
//@access private
const putTodo = asyncHanlder(async (req, res) => {
    const title = req.params.title;
    const todo = await todoModel.findOne({ title });

    if (!todo) {
        res.status(404);
        throw new Error("Todo item not found");
    }

    if(todo.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("Item cannot be updated by you");
    }

    // Apply updates
    const updates = req.body;
    Object.keys(updates).forEach((key) => {
        todo[key] = updates[key];
    });

    // Save the updated document
    await todo.save();

    res.status(200).json(todo);

});

//@desc delete todo item
//@route Delete /api/todo/:id
//@access private
const deleteTodo = asyncHanlder(async (req, res) => {
    const title = req.params.title;
    const todo = await todoModel.findOne({ title });

    if(!todo) {
        res.status(404);
        throw new Error("Item not found");
    }
    if(todo.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("Item cannot be deleted by you");
    }
    await todoModel.deleteOne({ title });
    res.status(200).json(todo);
});
//@desc delete todo item
//@route Update /api/todo/done/title/:title
//@access private
const doneTodo=asyncHanlder(async (req, res) => {
    const  title  = req.params.title;
    const todo = await todoModel.findOne({ title });
    if (!todo) {
        res.status(404);
        throw new Error("Todo item not found");
    }

    if(todo.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("Item cannot be updated by you");
    }

    // Apply updates
    if(todo.done==false) todo.done=true;
    else todo.done=false;
    // Save the updated document
    await todo.save();

    res.status(200).json(todo);
    
});

module.exports = {
    getTodos, getTodo, postTodo, putTodo, deleteTodo, getTodoByTitle,doneTodo
}
