const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/userController");

// POST /api/users/signup
router.post("/signup", signup);

// POST /api/users/signin
router.post("/signin", signin);

module.exports = router;
