const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  allEmployees,
  addEmployee,
  removeEmployee,
  getEmployee,
  editEmployee,
} = require("../controllers/employess");

router.get("/", auth, allEmployees);
router.get("/:id", auth, getEmployee);
router.post("/add", auth, addEmployee);
router.delete("/remove/:id", auth, removeEmployee);
router.put("/edit/:id", auth, editEmployee);

module.exports = router;
