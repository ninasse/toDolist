const mongoose = require("mongoose");

const schemaToDo = new mongoose.Schema({
        text: String,
        creator: String,
        date: {type: Date, default: Date.now},
    });

// variable ToDo referes to a class/ model. Todo inside parenteses referes to the collection/ database
const ToDo = mongoose.model("Todo", schemaToDo)

module.exports = ToDo;