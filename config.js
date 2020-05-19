module.exports = {
  port: process.env.PORT || 3000,
  min: 35,
  max: 40,
  mongodb: {
    uri: (process.env.NODE_ENV === 'test')
      ? 'mongodb://localhost/termo'
      : process.env.MONGODB_URI || 'mongodb://localhost/termo',
  },
  crypto: {
    iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
    length: 128,
    digest: 'sha512',
  },
}