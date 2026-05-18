const express = require("express");
const {
  createTask,
  getTasks,
  getMyTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.route("/")
  .post(protect, allowRoles("admin"), createTask)
  .get(protect, getTasks);

router.get("/my-tasks", protect, getMyTasks);

router.put("/:id", protect, allowRoles("admin"), updateTask);
router.patch("/:id/status", protect, updateTaskStatus);
router.delete("/:id", protect, allowRoles("admin"), deleteTask);

module.exports = router;