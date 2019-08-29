const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const persephonySDK = require("@persephony/sdk");
const port = process.env.PORT || 3000;

// Test API message
// your Persephony API key (available in the Dashboard) - be sure to set up environment variables to store these values
const accountId = process.env.accountId;
const authToken = process.env.authToken;
const persephony = persephonySDK(accountId, authToken);

const to = process.env.TO;
const from = process.env.FROM;

// Accept incoming requests on the /voice endpoint
app.post("/voice", (req, res) => {
  // Create Say script to greet caller
  var hello = persephony.percl.say("Hello, welcome to Persephony!");
  // Add Say script greeting to PerCL script and append to response
  res.status(200).json(persephony.percl.build(hello));
  // send message to phone number
  persephony.api.messages.create(from, to, "Welcome to Persephony!");
});

app.listen(port);
