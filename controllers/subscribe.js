const AdminSession = require('../models/AdminSession')
let admins = []
module.exports.subscribe = async function subscribe(ctx, next) {
  const data = newData(ctx)
  if (!data) return
  ctx.body = await data
}

function newData (ctx) {
  if (admins.find(item => item.email === ctx.user.email)) {
    admins = admins.filter(item => item.email !== ctx.user.email)
  }
  return  new Promise(resolve => {
      admins = admins.concat({email: ctx.user.email, resolve})
  })
}

module.exports.sendMessageToAdmin = async function sendMessageToAdmin (ctx, object) {
  const { id, temp, status, data } = object
  const admin = await AdminSession.findOne({user: ctx.user._id})
  if (admin) {
    const currentAdmin = admins.find(item => item.email === ctx.user.email)
    admins = admins.filter(item => item.email !== ctx.user.email)
    currentAdmin.resolve({ id, temp, status, image: data.fileName })
  }
}