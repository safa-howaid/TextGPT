const { VoiceResponse } = require("twilio").twiml;

const post = async (req, res) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say({ voice: "alice" }, "hello world!");

  // Render the response as XML in reply to the webhook request
  res.type("text/xml");
  res.send(twiml.toString());
};

const welcome = async (req, res) => {
  const twiml = new VoiceResponse();

  gather.say("Hello! Welcome to the information hotline! What is your question?");
  twiml.gather({
    // enhanced: "true",
    speechTimeout: "auto",
    speechModel: "phone_call",
    input: "speech",
    // action: `/respond?${params}`,
  });
  console.log(gather.toString());
  console.log(twiml.toString());
  // while (twiml.toString().trim() == "") {
  //   twiml.say("I'm sorry, I didn't catch that. What is your question?", { loop: 3 });
  // twiml.gather({
  //   // enhanced: "true",
  //   speechTimeout: "auto",
  //   speechModel: "phone_call",
  //   input: "speech",
  //   // action: `/respond?${params}`,
  // });
  // }

  // const params = new URLSearchParams({ prompt: twiml.toString() });
  // twiml.redirect(
  //   {
  //     method: "POST",
  //   },
  //   `/respond?${params}`
  // );

  res.send(twiml.toString());
};

const respond = async (req, res) => {
  const twiml = new VoiceResponse();
  console.log(req.params);
  const response = await generateResponse(req.params.prompt);
  twiml.say(response);

  twiml.say(
    "If you would like me to repeat the response, press 1. " + "If you would like to ask another question, press 2."
  );

  const gather = twiml.gather({
    numDigits: "1",
  });

  console.log(gather.toString());

  if (gather.toString() == 1) {
    twiml.say(response);
    twiml.say(
      "If you would like me to repeat the response, press 1. " + "If you would like to ask another question, press 2."
    );
  } else if (gather.toString() == 2) {
    twiml.redirect("/voice/welcome");
  } else {
    twiml.say("Invalid option.");
  }
  twiml.say("Good bye!");
  twiml.hangup();

  res.send(twiml.toString());
};

async function generateResponse(prompt) {
  const apiResponse = await openai.createCompletion({
    model: "text-curie-001",
    prompt: prompt,
    max_tokens: 3000,
    temperature: 0.8,
  });
  return apiResponse.data.choices[0].text;
}

module.exports = {
  post,
  welcome,
  respond,
};
