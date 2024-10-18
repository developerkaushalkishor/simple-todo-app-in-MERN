const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

//connecting to db

mongoose
  .connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

// creating schemas and schema model

const todoShema = new mongoose.Schema({
  task: String,
});

const Task = mongoose.model("task", todoShema);

// routes

app.post("/add", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: "Task deleted successfully" }); // return a message
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
