const User = require('../models/User')
const Session = require('../models/Session')
const AdminSession = require('../models/AdminSession')

module.exports.loginAdmin = async function loginAdmin(ctx, next) {
  const { email, password }  = ctx.request.body
  if (!email) return ctx.throw(401, 'no User')
  if (!password || typeof password !== 'string') return ctx.throw(401, 'no User')
  const user = await User.findOne({ email })
  if (!user) return ctx.throw(401, 'no User')
  const validPassport = await user.checkPassword(password);
  if(!validPassport) return ctx.throw(401, 'no User');
  const adminSession = await AdminSession.find({user})
  if (!adminSession.length) {
    const session = await Session.find({user})
    if (!session.length) return ctx.throw(401, 'no Session');
    await AdminSession.create({token: session[0].token, user, lastVisit: new Date()})
    ctx.status = 200
    ctx.body = {token: session[0].token}
    return
  } else {
    ctx.status = 200
    ctx.body = {token: adminSession[0].token}
    return
  }
};