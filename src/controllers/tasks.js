import { Tasks } from '../models/models';

export const tasksPage = async (req, res, next) => {
  debugger;
  try {
    const tasks = await Tasks.find();
    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const updateTask = async (req, res, next) => {
  const { type, assignee, title, description } = req.body;
  const Title = title;
  console.log(req.body)
  try {
    let currentTask = await Tasks.findOne({
      title: Title,
    });
    currentTask.type = type;
    currentTask.assignee = assignee;
    currentTask.title = Title;
    currentTask.description = description;
    await currentTask.save();
    const m = currentTask;
    res.status(202).json({ success: true, message: m });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const addTask = async (req, res, next) => {
  const dateDue = addDays(new Date(), 3);
  const { type, assignee, title, description } = req.body;
  try {
    const m = await Tasks({
      type,
      assignee,
      title,
      description,
      dateDue,
    }).save();
    res.status(201).json({ success: true, message: m });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  const { title } = req.body;
  const currentTitle = title;
  console.log(currentTitle);
  try {
    let currentTask = await Tasks.deleteOne({ title: currentTitle });
    res.status(203).json({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
