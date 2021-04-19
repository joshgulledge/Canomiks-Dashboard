const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const orderRouter = require('./routes/order.router');
<<<<<<< HEAD
const uploadRouter = require('./routes/upload.router')
=======
const companyRouter = require('./routes/company.router');
const emailRouter = require('./routes/email.router');

>>>>>>> 02852e7499fb3ede6a583d859dd1c3d1766ef68c
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);
<<<<<<< HEAD
=======
app.use('/api/companies', companyRouter);
app.use('/api/email', emailRouter);
>>>>>>> 02852e7499fb3ede6a583d859dd1c3d1766ef68c

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;
//AWS
app.use('/s3',require('react-dropzone-s3-uploader/s3router', uploadRouter) ({
 
  bucket: process.env.AWS_S3_BUCKET,                          
  region: process.env.AWS_S3_REGION,                            
  headers: {'Access-Control-Allow-Origin': '*'},  		    
  ACL: 'public-read',     
                      
})
);


/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
