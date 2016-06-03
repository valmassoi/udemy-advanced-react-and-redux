const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const User = require('../models/user')

if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()
const { SECRET_KEY } = process.env


// create local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify email and password
  User.findOne({ email }, (err, user) => {
    if(err)
      return done(err)
    if(!user)
      return done(null, false)

    user.comparePassword(password, (err, isMatch) => {
      if(err)
        return done(err)
      if(!isMatch)
        return done(null, false)
      return done(null, user)
    })
  })

})

// options for jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET_KEY
}

//create jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => { //payload is decoded token
  //see if user id in payload exists in db, then call done with user object, else done with no user
  User.findById(payload.sub, (err, user) => {
    if(err) { return done(err, false) }
    if (user)
      done(null, user)
    else
      done(null, false)
  })
})

//tell passport to use this Strategy
passport.use(jwtLogin)
passport.use(localLogin)
