const Token = require('../models/Token')
const { v4: uuid } = require('uuid');

module.exports.createToken = async function createToken(ctx, next) {
  const { data } = ctx.request.body
  if (typeof data !== 'number' || data > 22) return ctx.throw(401, 'fuck off')
  const token = uuid()
  await Token.create({ token})
  ctx.body = {data: token}
};