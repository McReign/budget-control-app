const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const router = require('./router');

const app = new Koa();

app.use(require('@koa/cors')());
app.use(require('koa-bodyparser')());
app.use(require('koa-static')(path.join(__dirname, '../client/build')));

app.use(require('./middlewares/error'));
app.use(require('./middlewares/validationError'));
app.use(require('./middlewares/session'));
app.use(require('./middlewares/wallets'));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '../client/build/index.html'));
})

module.exports = app;
