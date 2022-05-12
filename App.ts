const router = require('./routes/Router');
var cors = require('cors');
var express = require('express');
var responseTime = require('response-time');

class App {
  app: any;

  constructor () {
    this.app = express().disable('x-powered-by');
    this.config();
  }

  async config (): Promise<void> {
    this.app.use(responseTime());
    this.app.use(cors());
    this.app.use(express.json({ limit: '100mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '100mb' }));
    this.app.use('/', router);
  }
}

export default new App().app;