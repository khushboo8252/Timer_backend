const Task = require("../models/Task");

// CREATE Task
const createTask = async (req, res) => {
  try {
    console.log("🔍 req.user:", req.user); // debug

    const { title, description, duration } = req.body;

    const task = new Task({
      title,
      description,
      duration,
      user: req.user.id, // ✅ Comes from middleware
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Create Task Error:", err.message);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// GET all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// UPDATE a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// DELETE a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

// ✅ Export all handlers
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
