const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/', (req, res) => {
  // console.log(req);
  res.send('HAVE FUN STAYING POOR!');
});

router.get('/status', (req, res) => {
  res.cookie('tetsting','test');
  res.status(210).json({
    message: 'ok',
    status: 200
  });
});

router.post('/signup', passport.authenticate('signup', {
  session: false
}), async (req, res, next) => {
  res.status(200).json({
    message: 'signup was sucessful',
    status: 200
  });
});

router.post('/compute', (req, res, next) => {
  if (parseInt(req.body.value, 10) > 5) {
    res.json(req.body.value*2);
  } else {
    next(new Error('testing 500s')); //res.json('value too low or something wrong')
  }
  
  console.log(req.body);
  // if(req.body.value > 5) {
    
  //   res.status(200).json({
  //     message: 2,
  //     status: 200
  //   });
  // } else {
  //   
  // }
  

});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', (error, user) => {
    try {
      if (error) {
        return next(error);
      } 
      if (!user) {
        return next(new Error('email password required'));
      }
        req.login(user, { 
          session: false

        }, (err) => {
          if (err) {
            return next(error);
          } else {
            return res.status(200).json({
              user, 
              status: 200
            });
          }
        });

    } catch (err) {
      console.log(`error: ${err}`);
      return next(err);
    }
  })(req, res, next);


  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: 'invalid body',
      status: 400
    });
  } else {
    res.status(200).json({
      message: 'ok',
      status: 200
    });
  }
});

router.post('/logout', (req, res) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: 'invalid body',
      status: 400
    });
  } else {
    res.status(200).json({
      message: 'ok',
      status: 200
    });
  }
});

router.post('/token', (req, res) => {
  if (!req.body.refreshToken ) {
    res.status(400).json({
      message: 'invalid body',
      status: 400
    });
  } else {
    const { refreshToken } = req.body;
    res.status(200).json({
      message: `token refresh for: ${refreshToken}`,
      status: 200
    });
  }
});

module.exports = router;