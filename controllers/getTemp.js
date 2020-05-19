const config = require('../config');

module.exports.getTemp = async function getTemp (ctx, next) {
  const temp = +(Math.random() * (config.max - config.min) + config.min).toFixed(1)
  ctx.status = 200
  ctx.body = { data: temp, status: 'ok' }
}