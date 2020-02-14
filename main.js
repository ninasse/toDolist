//import express from 'express';
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/config");
const toDoRoutes = require("./routes/toDoRoutes");
const sassMiddleware = require("node-sass-middleware");

const app = express();
const PORT = process.env.PORT || 8002;

// middleware
app.use(express.urlencoded({extended: true}));

app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}));


app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// routes
app.use(toDoRoutes);

// extra features to be passed when connecting to db to avoid errors
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};


// connection to db and then listen to PORT
mongoose.connect(config.databaseURL,options).then(()=> {
    console.log("Koppling till databas OK!");
    app.listen(PORT);
});

module.exports = app;