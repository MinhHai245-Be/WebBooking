const express = require("express");
const userControllers = require('../controllers/user')


const router = express.Router();

router.post("/register", userControllers.postRegister);

router.post("/login", userControllers.postLogin);

module.exports = router;
