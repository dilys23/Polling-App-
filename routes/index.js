// const express = require("express");
// const router = express.Router();
// const bcrypt = require('bcrypt');
// // const userRouter = require("./user.router.js");
// var database = require('../database/connection.js');
// const jwt = require('jsonwebtoken');

// router.get('/index', (req, res) => {
//     res.render('index', {
//         session: req.session
//     });
// });


// router.get('/register', (req, res) => {
//     res.render('register');
// })
// router.post('/register', async (req, res) => {
//     const {
//         username,
//         email,
//         password
//     } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const query = 'Insert into users (username, email, password) values (?, ?, ?)  ';
//         const result = await database.query(query, [username, email, hashedPassword]);
//         res.redirect('/login');
//     } catch (error) {
//         console.error('error')
//         res.status(500).send('An error occurred');
//     }


// })

// router.get('/login', (req, res) => {
//     res.render('login');
// })

// router.post('/login', async (req, res) => {
//     const {
//         email,
//         password
//     } = req.body;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;

//     try {
//         const query = 'select * from users where email = ?';
//         const results = await database.query(query, [email]);

//         if (results.length > 0) {
//             const user = results[0][0];
            
//             const match = await bcrypt.compare(password, user.password);
            
//             if (match) {
                
//                 console.log(user.user_id);
//                 // req.session.user_id = user.user_id;
//                 const token = jwt.sign(user, jwtSecretKey);
//                 console.log('Login successful');
//                 res.send(token);
//                 // res.redirect('/index');
//             } else {
//                 console.log('Incorrect Password');
//                 res.send('Incorrect Password');
//             }
//         } else {
//             console.log('Incorrect Email Address');
//             res.send('Incorrect Email Address');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('An error occurred');
//     }
// });

// router.get('/logout', function (request, response) {
//     request.session.destroy();
//     response.redirect('/');

// })


// router.get('/user', async (req, res) => {
//     const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     const jwtSecretKey = process.env.JWT_SECRET_KEY;

//     try {
//         const token = req.headers.authorization.split(' ')[1];

//         console.log(token);
//         if (!token) {
//             return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
//         }

//         const verified = jwt.verify(token, jwtSecretKey);
//         if (verified) {
//             const result = await database.query("SELECT * FROM users");
//             return res.status(200).json({ status: 'success', data: result[0] });
//         } else {
//             return res.status(401).json({ message: 'Access Denied. Invalid Token.' });
//         }
//     } catch (error) {
//         return res.status(401).json({ message: 'Access Denied. Error occurred.', error: error.message });
//     }
// });

// module.exports = router;

// // router.get('/user', async(req, res)=>
// // {
// //     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
// //     let jwtSecretKey = process.env.JWT_SECRET_KEY;
// //     try {
// //         const token = req.header(tokenHeaderKey);

// //         const verified = jwt.verify(token, jwtSecretKey);
// //         if (verified) {
// //             const result = await db.query("select * from users");
// //             console.log(result);
// //             return  res.status(200).json(result);
// //         } else {
// //             // Access Denied
// //             return res.status(401).send(error);
// //         }
// //     } catch (error) {
// //         // Access Denied
// //         return res.status(401).send(error);
// //     }
// // })

// // // router.use("/user",userRouter );
// // module.exports = router;

const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const voteRouter = require('./vote.router');
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/vote', voteRouter);
module.exports = router;
