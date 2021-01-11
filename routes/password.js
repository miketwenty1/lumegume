const express = require('express');
const router = express.Router();

router.post('/forgotpassword', (req, res) => {
  if (!req.body.email ) {
    res.status(400).json({
      message: 'invalid body',
      status: 400
    });
  } else {
    const { email } = req.body;
    res.status(200).json({
      message: `forgot password for: ${email}`,
      status: 200
    });
  }
});

router.post('/resetpassword', (req, res) => {
  if (!req.body.email ) {
    res.status(400).json({
      message: 'invalid body',
      status: 400
    });
  } else {
    const { email } = req.body;
    res.status(200).json({
      message: `reset password for: ${email}`,
      status: 200
    });
  }
});

module.exports = router;