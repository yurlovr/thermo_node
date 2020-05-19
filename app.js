const { v4: uuid } = require('uuid')
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const serve = require('koa-static')
const { getData } = require('./controllers/getData')
const  { getTemp } = require('./controllers/getTemp')
const { login } = require('./controllers/login')
const { test } = require('./controllers/test')
const { loginAdmin } = require('./controllers/loginAdmin')
const { allMeasurement } = require('./controllers/allMeasurement')
const { createToken } = require('./controllers/createToken')
const { registration } = require('./controllers/registration')
const { getImages } = require('./controllers/getImages')
const handleMongooseValidationError = require('./libs/validationErrors')
const mustBeAuthenticated = require('./libs/mustBeAuthenticated')
const { subscribe } = require('./controllers/subscribe')
const Session = require('./models/Session')
const AdminSession = require('./models/AdminSession')

const app = new Koa()
app.use(cors())
app.use(require('koa-bodyparser')())
app.use(serve('public'))
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
})
app.use((ctx, next) => {
  ctx.login = async function(user) {
    const token = uuid()
    await Session.create({token, user, lastVisit: new Date()})
    return token;
  };

  return next()
})

const router = new Router({prefix: '/api'})

router.use(async (ctx, next) => {
  const token = ctx.request.get('Authorization')
  if (!token) return next();

  const session = await Session.findOne({token}).populate('user')
  const adminSession = await AdminSession.findOne({token}).populate('user')
  if (!session && !adminSession) {
    ctx.throw(401, 'Неверный аутентификационный токен')
  }
  if (session) {
    session.lastVisit = new Date()
    await session.save()
    ctx.user = session.user
    return next()
  }
  if (adminSession) {
    adminSession.lastVisit = new Date()
    await adminSession.save()
    ctx.user = adminSession.user
    return next()
  }
});

router.post('/auth', login)
router.post('/isAdmin', loginAdmin)
router.post('/ajfe5x9Zd79qZ9MAsb', createToken)
router.post('/YTR04l6oASj1yFzhez', registration)
router.get('/images/:img', getImages)
router.post('/subscribe', mustBeAuthenticated, handleMongooseValidationError, subscribe)
router.post('/allMeasurement', mustBeAuthenticated, handleMongooseValidationError, allMeasurement)
router.post('/test',  mustBeAuthenticated, handleMongooseValidationError, test)
router.post('/data', mustBeAuthenticated, handleMongooseValidationError, getData)
router.post('/getTemp', mustBeAuthenticated, handleMongooseValidationError, getTemp)

app.use(router.routes())

module.exports = app