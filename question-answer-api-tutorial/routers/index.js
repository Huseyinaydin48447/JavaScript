//(12)
const express = require('express');
const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const admin = require("./admin");

const router = express.Router();
//(13)
router.use("/questions", question)
router.use("/auth", auth);
router.use("/users", user);//141
router.use("/admin",admin)   //165
module.exports = router;