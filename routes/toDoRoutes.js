const express = require ("express");
const Todo = require("../model/Todo");
// express.Router is a function within express to handle our routes.
const router = express.Router();

router.get("/todolist/sorted", async (request, response)=> {
    console.log(request.query);
    const sorted= request.query.sort+1;
    const toDos = await Todo.find().sort({todo: sorted});
    response.render("toDoList", {toDos});
});

router.get("/todolist", async (request, response)=> {
    
    const toDos = await Todo.find();
    response.render("toDoList", {toDos});
});

router.post("/todolist", async (request, response)=> {
    const toDo = await new Todo ({
            todo: request.body.todo,
            creator: request.body.creator,
            //date: {type: Date, default: Date.now}
    });
    const newTask = toDo.save();
    response.redirect("/todolist");
});

router.get("/delete/:id", async (request, response)=> {
    console.log(request.params.id);
    await Todo.deleteOne({_id: request.params.id});
    response.redirect("/todolist");
});

router.route("/update/:id")

.get(async (request, response)=> {
    const editRes = await Todo.findById({_id: request.params.id});
    response.render("edit", {editRes});
})

.post(async (request, response)=> {
    await Todo.updateOne({_id: request.params.id}, {$set: {todo: request.body.todo, creator: request.body.creator}}, {runValidators: true});
    console.log(request.body);
    response.redirect("/todolist");
});

module.exports = router;
