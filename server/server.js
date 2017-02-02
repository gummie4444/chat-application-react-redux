/* eslint-disable no-console, no-use-before-define */
import path from 'path'
import Express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import passport from 'passport';
require('./config/passport')(passport);

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';

import ApiRouter from '../server/routes/apiRouter';
import PageRouter from '../server/routes/pageRouter';

import socketIO from 'socket.io';
import config from './config/config';

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';


const app = new Express();
const port = 3000; //TODO:MOVE TO CFG

//connect to db
mongoose.connect(config.dbUrl);

app.use(passport.initialize());
app.use(cors());
//app.use(session({ secret: 'jesuschrist' })); // session secret

app.use(cookieParser());



// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

//MABY REFACTOR
const pageRouter = Express.Router();
const apiRouter = Express.Router();

PageRouter(pageRouter);
ApiRouter(apiRouter, passport);

app.use('/api', apiRouter);
app.use('*', pageRouter);

//SKOÐA app.use('/', express.static(path.join(__dirname, '..', 'static')));

const server = app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});

//SETUP SOCKET
const io = socketIO();

io.attach(server);
require('./routes/socket')(io);
