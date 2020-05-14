module.exports.getData = async function getData (ctx, next) {
  ctx.status = 200
  ctx.body = { data:'', status: 'Ok'}
}