const mongoose = require("mongoose");

const schemaToDo = new mongoose.Schema({
        todo: {type: String, required: true},
        creator: {type: String, required: true},
        date: {type: Date, default: Date.now},
    });

// variable ToDo referes to a class/ model. Todo inside parenteses referes to the collection/ database
const ToDo = mongoose.model("Todo", schemaToDo)

module.exports = ToDo;