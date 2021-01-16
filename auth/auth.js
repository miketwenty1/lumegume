const passport = require('passport');
const localStrategy = require('passport-local');

const UserModel = require('../models/UserModel')

passport.use(passport.initialize());
passport.use(passport.session());
passport.use('signup', new localStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  try {
    const { username } = req.body;
    const user = await UserModel.create({email, password, username});
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use('login', new localStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {

  if (email !== 'joe@test.com') {
    return done(new Error('User not found'), false);
  } 
  if (password !== 'test') {
    return done(new Error('Invalid Password'), false );
  }

  return done(null, {name: 'joe'});
}));