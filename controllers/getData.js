const base64ToImage = require('base64-to-image')
const User = require('../models/User')
const path = require('path')
const { sendMessageToAdmin } = require('./subscribe')

module.exports.getData = async function getData (ctx, next) {
  const { photo, status, temp } = ctx.request.body
  if (!photo) return ctx.throw(401, 'no Photo');
  if (!status && status !== 0) return ctx.throw(401, 'no status')
  if (!temp) return ctx.throw(401, 'no temp');
  const pathToimage ='./images/'
  const optionalObj = {'type':'jpg'}
  const imageInfo = await base64ToImage(photo, pathToimage, optionalObj)
  const user = await User.findOne({ email: ctx.user.email })
  const date = new Date().getTime()
  user.measurement = ctx.user.measurement.concat({
    id: date,
    temp,
    status,
    image: imageInfo.fileName
  })
  await user.save()
  ctx.user = user
  ctx.status = 200
  sendMessageToAdmin(ctx, { id: date, data: imageInfo, temp, status, user: ctx.user })
  ctx.body = { data: imageInfo, temp, status, user: ctx.user }
}