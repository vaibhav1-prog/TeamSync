const Task = require("../models/Task");
const Project = require("../models/Project");

const getDashboardStats = async (req, res) => {
  try {
    const taskQuery = req.user.role === "admin" ? {} : { assignedTo: req.user._id };

    const totalProjects =
      req.user.role === "admin"
        ? await Project.countDocuments()
        : await Project.countDocuments({ members: req.user._id });

    const totalTasks = await Task.countDocuments(taskQuery);

    const todoTasks = await Task.countDocuments({
      ...taskQuery,
      status: "todo",
    });

    const inProgressTasks = await Task.countDocuments({
      ...taskQuery,
      status: "in-progress",
    });

    const completedTasks = await Task.countDocuments({
      ...taskQuery,
      status: "completed",
    });

    const overdueTasks = await Task.countDocuments({
      ...taskQuery,
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    res.json({
      totalProjects,
      totalTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
};