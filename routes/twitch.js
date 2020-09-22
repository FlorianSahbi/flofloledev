const express = require('express');
const router = express.Router();
const axios = require("axios");
const TWITCH_PUBLIC = "eshjprlpr7l30rlp3y0qir8ai1tfmo";
const TWITCH_SECRET = "el6c73ceie9uus9yjcoz4ou9kmyz8f";
const TOKEN = "Bearer nh2yh2tmukhti8d4rywj8b74i18dot";

const headers = {
  "Client-ID": TWITCH_PUBLIC,
  "Authorization": TOKEN,
}

router.get('/token', async (req, res, next) => {
  const params = {
    client_id: TWITCH_PUBLIC,
    client_secret: TWITCH_SECRET,
    grant_type: "client_credentials"
  }
  try {
    const response = await axios.post("https://id.twitch.tv/oauth2/token", null, { params })
    res.send(response.data);
  } catch (error) {
    res.send(error)
  }
  res.send('1');
});

router.get('/webhook/subscribe/', (req, res, next) => {
  const data = {
    "hub.callback": "https://quiet-badlands-04937.herokuapp.com/twitch/confirm",
    "hub.mode": "subscribe",
    "hub.topic": "https://api.twitch.tv/helix/streams?user_id=63875647",
    "hub.lease_seconds": 864000,
  }
  res.send('2');
});

router.get("/confirm", (req, res) => {
  console.log(req)
  res.status(200).send(req.query[Object.keys(req.query)[0]])
})

router.get('/webhook/unsubscribe/:userId', (req, res, next) => {
  res.send('3');
});

router.get('/subscriptions', (req, res, next) => {
  res.send('4');
});

module.exports = router;
