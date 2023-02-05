const { MessagingResponse } = require("twilio").twiml;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const post = async (req, res) => {
  const twiml = new MessagingResponse();
  const userRequest = req.body.Body || "";

  if (userRequest.trim().length === 0) {
    twiml.message("Please enter a valid prompt.");
    res.type("text/xml").send(twiml.toString());
  } else {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        // model: "text-ada-001",
        prompt: userRequest,
        temperature: 0.5,
      });
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
};

module.exports = {
  post,
};
