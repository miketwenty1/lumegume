require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// routes
const routes = require('./routes/rest');
const passwordRoutes = require('./routes/password');
const secureRoutes = require('./routes/secure');

// require passport auth
require('./auth/auth');


console.log(mongoose.version);
// mongo connection
const uri = process.env.MONGO_CONNECTION_URL;
console.log(uri);
const mongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
if (process.env.MONGO_USER_NAME && process.env.MONGO_PASSWORD) {
  mongoConfig.auth = { authSource: 'admin' };
  mongoConfig.user = process.env.MONGO_USER_NAME;
  mongoConfig.pass = process.env.MONGO_PASSWORD;
}
mongoose.connect(uri, mongoConfig);

mongoose.connection.on('error', (err) => {
  console.log(err);
  process.exit(1);
});

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN
}));
app.use(cookieParser());

// setup routes
app.use('/', routes);
app.use('/', passwordRoutes);
// secure routes secured by jwt
app.use('/', passport.authenticate('jwt', {session: false}), secureRoutes);


// catch all other routes (404's)

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
    status: 404
  });
});

// handle errors

app.use((err, req, res, next) => {
  res.status(err.status || 599).json({
    error: err.message,
    status: 599
  });
});



mongoose.connection.on('connected', () => {
  
  console.log('connected to mongo');

  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
})