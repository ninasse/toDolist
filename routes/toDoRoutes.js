const express = require ("express");
const Todo = require("../model/Todo");
// express.Router is a function within express to handle our routes.
const router = express.Router();

router.get("/todolist", async (request, response)=> {
    //console.log(request.query);
    // const sorted= request.query.sort;
    const toDos = await Todo.find().sort({date: -1});
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

router.get("/update/:id", async (request, response)=> {
    const editRes = await Todo.findById({_id: request.params.id});
    response.render("edit", {editRes});
});

router.post("/update/:id", async (request, response)=> {
    await Todo.updateOne({_id: request.params.id}, {$set: {todo: request.body.todo, creator: request.body.creator}}, {runValidators: true});
    console.log(request.body);
    response.redirect("/todolist");
});


        /* let msec = Date.parse(toDo.date);
        let dt = new Date(msec);
        let dateTaken = dt.toLocaleDateString(); */
module.exports = router;
