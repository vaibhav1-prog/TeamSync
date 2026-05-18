const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.route("/")
  .post(protect, allowRoles("admin"), createProject)
  .get(protect, getProjects);

router.route("/:id")
  .get(protect, getProjectById)
  .put(protect, allowRoles("admin"), updateProject)
  .delete(protect, allowRoles("admin"), deleteProject);

module.exports = router;