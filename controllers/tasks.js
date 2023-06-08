const TaskModel = require("../ models/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await TaskModel.find({});
  return res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskModel.create(req.body);
  return res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await TaskModel.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task found with id ${taskId}`, 404));
  }
  return res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await TaskModel.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task found with id ${taskId}`, 404));
  }
  return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await TaskModel.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task found with id ${taskId}`, 404));
  }
  return res.status(200).send();
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
