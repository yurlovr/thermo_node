const fs = require('fs')
const path = require('path')
const extname = path.extname

module.exports.getImages = async function getImages(ctx, next) {
  if (!ctx.params) return ctx.throw(401, 'no params')
  const fpath = './images/' + ctx.params.img
  const smilePath = './images/smile.jpg'
  try {
    const fstat = await stat(fpath)
    if (fstat.isFile()) {
      ctx.type = extname(fpath)
      ctx.body = fs.createReadStream(fpath)
    }
  }
  catch(e) {
    ctx.type = extname(smilePath)
    ctx.body = fs.createReadStream(smilePath)
  }
}
function stat(file) {
  return new Promise(function(resolve, reject) {
    fs.stat(file, function(err, stat) {
      if (err) {
        reject(err)
      } else {
        resolve(stat)
      }
    })
  })
}