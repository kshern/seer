
const Koa = require('koa')
const Static = require('koa-static');
const path = require('path');

let app = new Koa()

const staticPath = './public/';

app.use(Static(path.resolve(__dirname, staticPath)));

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3163);