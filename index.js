require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Add sms router
const smsRouter = require("./routes/sms.routes");
app.use("/sms", smsRouter);

// Add voice router
const voiceRouter = require("./routes/voice.routes");
app.use("/voice", voiceRouter);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
