const express = require('express');
const axios = require('axios');
const https = require('https');
const setCookie = require('set-cookie-parser');

const router = express.Router();

const redirectUrl = process.env.POLLY_DIALOG_FINISHED_URL || '/finished.html';

function pollyUrl(req) {
  return process.env.POLLY_LOGIN_URL || req.headers.origin + '/login';
}

router.get('/dialog/start', function(req, res) {
  const data = {
    title: 'Login Dialog',
  };
  res.render('start', data);
});

router.post('/dialog/start', async function(req, res) {
  console.log(req.body);
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const login = await axios.post(pollyUrl(req),{
    user_id: req.body.user_id,
    password: process.env.POLLY_PASSWORD,
  },{
    httpsAgent,
  });

  const cookies = setCookie.parse(login, {
    map: true,
  });
  console.log(cookies['session_cookie']);

  res.cookie('session_cookie', cookies['session_cookie'].value, {
    secure: false,
    httpOnly: false,
  });
  res.redirect(redirectUrl);
});

module.exports = router;
