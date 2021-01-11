require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

const routes = require('./routes/rest');
const passwordRoutes = require('./routes/password');
require('./auth/auth');

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

app.listen(port, () => {
  console.log(`running on port ${port}`);
});