const express = require("express");
const voiceController = require("../controllers/voice.controller");

const router = express.Router();

// POST /voice/welcome
router.post("/welcome", voiceController.welcome);
// POST /voice/respond
router.post("/respond", voiceController.respond);

module.exports = router;
