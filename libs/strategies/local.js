const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/User')
const Session = require('../../models/Session')


module.exports = new LocalStrategy(
    {
      session: false,
      usernameField : 'email',
    },
    async function(email, password, done) {
      const user = await User.findOne({email})
      if (!user) return done(null, false, 'Нет такого пользователя' )
      const validPassport = await user.checkPassword(password);
      if (!validPassport) return done(null, false, 'Невереный пароль' )
      const session = await Session.find({user})
      if (session.length) {
        await Session.deleteOne({user: user._id})
      }
      done(null, user)
    }
);
