const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const { getData } = require('./controllers/getData')

const app = new Koa();
app.use(cors())
app.use(require('koa-bodyparser')());
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status) {
      ctx.status = err.status
      ctx.body = err.errors ? {errors: err.errors} : {error: err.message}
    } else {
      console.error(err)
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'}
    }
  }
});

const router = new Router({prefix: '/api'})

router.post('/data', getData)

app.use(router.routes())

module.exports = app;