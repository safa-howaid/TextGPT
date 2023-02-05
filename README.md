# TextGPT
Answer pressing questions without internet! Want to try out the service? Try texting the number: +1 (385) 831-6656!
![textgpt1 (2)](https://user-images.githubusercontent.com/38355190/216830138-e1a75d2b-425c-4551-999e-780fcf94d763.png)

## Inspiration
OpenAI's ChatGPT has taken the world by storm since it has been released and has already changed the way many of us use the internet. This project was born out of some conversations we had about how powerful this new technology is at summing up huge amounts of data into consumable, summarized points. 

Another source of inspiration was the incredibly high costs of mobile data packages compared to text and call packages with mobile service providers in Canada. Essential services provided over text/call are more accessible in terms of affordability and widespread availability, not only across North America but around the world as well. (See data source below for comparison between internet vs cell service per capita around the world)

Nowadays, our mobile devices are an extension to our memory. No longer do we need to memorize tiny details nor spend days reading books to understand concepts. We already have the technology that can help us access the world's largest knowledge base in seconds, so it's a shame that we can only access it with a stable internet connection. We believe that information is power and making information more accessible will only stand to make life more convenient for everyone!

## What it does
TextGPT is a service that allows users to get answers or help from OpenAI's language model by sending a prompt or question via a text message to the "information hotline". The user then gets a response to their question in a matter of seconds.

As texting is not always convenient on non-smart cell phone models, another option is to call the line and our interactive voice response system will listen to the user's question and will respond to it both verbally and with a text message, so that the user can reference that information at a later time after the call.

## How we built it
We first created a web server using Node.js and Express.js to serve as a base for the project. We then used the Twilio API to create a phone number that would serve as our "information hotline" and add the webhooks that perform actions whenever the phone number received a call or text message. 

We also created a VM instance using Google Cloud Platform's Compute Engine. This instance hosts our web server so that it can be accessed by Twilio's server to provide interactivity.

In addition, we used OpenAI's Completion API endpoint to generate responses using various Generative Pre-trained Transformer 3 (GPT-3) language models. 

Here's how the flow of operations works:
- When a text or call is received, Twilio sends a HTTP POST message to the appropriate endpoint on our web server that is hosted on Google Cloud. The web server then runs the logic that gets the prompt from the user, sends it to OpenAI's completion endpoint for processing, and sends an answer back to Twilio. Twilio then sends the response back to the user in the form of a text or a response from a bot during the ongoing call. 

Boom! We now got the information we needed without a cellular internet or wifi connection!

## Challenges we ran into
One of the main challenges we ran into is using the trial version of Twilio and OpenAI's APIs. We were limited by the amount of requests we were able to send before running out of credits for our API trials. So, we had to develop the project in a way where we ensure that we can write and debug the code while running it as little times as possible to conserve resources. We wanted the judges to also be able to run our project and be able to see it working by sending a message or giving it a call!

## Accomplishments that we're proud of
- We're super proud that we were able to learn how to use a lot of different technologies and integrate them effectively to make this all happen!

## What we learned
- We have never worked with OpenAI or Google Cloud services and APIs before, so throughout our work on this project, we were able to gain familiarity and knowledge on these technologies.

## What's next for TextGPT
- Some additional functionality that would be helpful is adding support for different languages to make it more accessible worldwide
- We can also create a mechanism for remembering a user's previous prompts/questions in order to return answers that are more tailored to that user based on their history.

#### Data Sources:
- https://ourworldindata.org/grapher/mobile-cellular-subscriptions-per-100-people?time=latest
- https://ourworldindata.org/grapher/broadband-penetration-by-country?time=latest
