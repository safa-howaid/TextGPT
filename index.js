require("dotenv").config();

const express = require("express");
const axios = require("axios").default;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { MessagingResponse } = require("twilio").twiml;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.post("/sms", async (req, res) => {
  const twiml = new MessagingResponse();
  const userRequest = req.body.Body || "";

  if (userRequest.trim().length === 0) {
    twiml.message("Please enter a valid prompt.");
    res.type("text/xml").send(twiml.toString());
  } else {
    try {
      let response = await getCompletionResponse(userRequest);
      twiml.message(response.data.choices[0].text);
      res.type("text/xml").send(twiml.toString());
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
        twiml.message(error.response.status + error.response.data);
        res.type("text/xml").send(twiml.toString());
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        twiml.message("An error occurred during your request.");
        res.type("text/xml").send(twiml.toString());
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

async function getCompletionResponse(userPrompt) {
  return axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-ada-001",
      prompt: userPrompt,
      temperature: 0.6,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
}
