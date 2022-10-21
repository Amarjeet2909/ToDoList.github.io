const express = require("express");
const bodyParser = require("body-parser");

//requiring the mongoose module that I have installed in this project
const mongoose = require("mongoose");
//const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//creating the mongoDB database
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

//creating new database schema
const itemsSchema = {
    name: String
};

//model creation based on schema
const Item = mongoose.model("Item", itemsSchema);

//creating document in mongoose
const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to aff a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved default items to DB");
    }
});

app.get("/", function(req, res) {
  res.render("list", {listTitle: "Today", newListItems: items});
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
