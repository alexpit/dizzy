const express = require('express');
const Client = require('node-rest-client').Client;
const mailer = require('nodemailer');
const util = require('util');

const client = new Client();
const url = 'https://api.deezer.com';
const uid = process.env.DUID;
const token = process.env.TOK;
const smtpID = process.env.SMTPID;
const smtpPSWD = process.env.SMTPSWD;
const smptURL = process.env.SMTPURL

const smtpSrv = mailer.createTransport({
  host: smptURL,
  port: 465,
  secure: true,
  auth: {
    user: smtpID,
    pass: smtpPSWD
  }
});

const formatMsg = function(list) {
  const htmlList = list.map(item => {
    const lnk = item.link;
    const img = item.cover;
    const titl = item.title;
    const name = item.artist;
    return `<li><a href="${lnk}"><img src="${img}" alt="${titl} - ${name}"></a></li>`;
  });

  return {
    from:    `Dizzy <${smtpID}>`,
    to:      `${smtpID}`,
    subject: "Dizzy's daily",
    text:    "Dizzy's daily album playlist:",
    html:    `<html><ul>${htmlList}</ul></html>`
  };
}

const notify = function(req, res) {
  client.get(`${url}/user/${uid}/recommendations/albums?access_token=${token}`, body => {
    if (body && body.error && body.error.code) {
      res.send(`${body.error.code}: ${body.error.message}`)
      return;
    }

    const playlist = body.data.map(album => {
      return {
        title: album.title,
        link: album.link,
        cover: album.cover,
        artist: album.artist.name
      }
    });

    smtpSrv.sendMail(formatMsg(playlist), (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Message sent:  ${JSON.stringify(info)}`);
      }
    });
    res.send(`Playlist suggestion: ${JSON.stringify(playlist, null, 1)}`);
  });
}

const app = express();

app.get('/', (req, res) => {
  res.send('Take it easy Mr. Dizzy ...')
});

app.get('/wasup', notify);

app.listen(99, () => {
  console.log("Dizzy's ready to offer suggestions :-}");
});
