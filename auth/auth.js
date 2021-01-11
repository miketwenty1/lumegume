const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(passport.initialize());
passport.use(passport.session());
passport.use('signup', new localStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},async (req, email, password, done) => {
  console.log(req.body);
  console.log(email, password);

  const { username } = req.body;

  if (username && username !== 'error') {
    return done(null, {name: 'joe'});
  } else {
    return done(new Error('Invalid User'));
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