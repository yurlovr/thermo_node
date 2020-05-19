const User = require('../models/User')
const Token = require('../models/Token')

module.exports.registration = async (ctx, next) => {
  const {email, password, token } = ctx.request.body
  if (!token) return ctx.throw(401, 'fuck off')
  if (!email) return ctx.throw(401, 'fuck off')
  if (!password) return ctx.throw(401, 'fuck off')
  const registrationToken = await Token.findOne({token})
  if (!registrationToken) return ctx.throw(401, 'fuck off')
  const u = new User({email, password})
  await u.setPassword(password)
  console.log(u)
  await u.save()
  await Token.deleteOne({token})
  ctx.status = 200
  ctx.body = {
    user: `${email} was created`
  }
};