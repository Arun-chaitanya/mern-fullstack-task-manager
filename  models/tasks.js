const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    maxlength: [20, "The name cannot be longer than 20 charecters"],
    trim: true,
  },
  completed: { type: Boolean, default: false },
});

const TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;
