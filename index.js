const express = require('express');
const Client = require('node-rest-client').Client;
const util = require('util');

const client = new Client();
const url = 'https://api.deezer.com';
const uid = process.env.DUID;
const token = process.env.TOK;

const list = function(req, res) {
  client.get(`${url}/user/${uid}/recommendations/playlists?access_token=${token}`, body => {
    if (body && body.error && body.error.code) {
      res.send(`${body.error.code}: ${body.error.message}`)
      return;
    }
    const list = body.data.map(l => l.title);
    console.log(`${JSON.stringify(list)}`);
    res.send(`Recommended tracks: ${JSON.stringify(list, null, 1)}`);
  });
}

const app = express();

app.get('/', (req, res) => {
  res.send('Take it easy Mr. Dizzy ...')
});

app.get('/recommend', list);

app.listen(99, () => {
  console.log('server started');
});
