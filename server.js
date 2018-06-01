
const Koa = require('koa')
const Static = require('koa-static');
const path = require('path');

let router = require('./routes')


let app = new Koa()

const staticPath = './public/';

app
  .use(Static(path.resolve(__dirname, staticPath)))
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3163);