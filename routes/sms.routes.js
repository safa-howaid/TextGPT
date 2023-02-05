const express = require("express");
const smsController = require("../controllers/sms.controller");

const router = express.Router();

// POST /sms
router.post("/", smsController.post);

module.exports = router;
