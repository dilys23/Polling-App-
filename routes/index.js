

const express = require('express');
const router = express.Router();
const welcomeRouter = require('./welcome.router'); 
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const voteRouter = require('./vote.router');
router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/vote', voteRouter);
router.use('/api/welcome', welcomeRouter); 
module.exports = router;
