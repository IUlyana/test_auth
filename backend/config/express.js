const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const getUser = require('../middlewares/getUser');

const Config = {
  store: new FileStore(),
  name: 'user_sid', 
  secret: process.env.SECRET ?? 'G(8x>|Ai^"+&', 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, 
    httpOnly: true, 
  },
};

function expressConfig(app) {

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use(cookieParser());

  app.use(session(Config));

  app.use(getUser);
}

module.exports = expressConfig;