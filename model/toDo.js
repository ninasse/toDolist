const mongoose = require("mongoose");

const schemaToDo = new mongoose.Schema({
        todo: {type: String, required: true},
        creator: {type: String, required: true},
        date: {type: Date, default: Date.now},
    });

// variable Todo referes to a class/ model. Todo inside parenteses referes to the collection/ database
const Todo = mongoose.model("todo", schemaToDo)

module.exports = Todo;