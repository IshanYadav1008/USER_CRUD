const express = require ('express')
const app     = express()

require('dotenv').config();
const PORT = process.env.PORT || 3000
const db      = require('./db') 

const passport = require('./auth');
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false})

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body

// ----------------------------------------------------------------------------------
// Applied Middleware function to print date and time for all routes:
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made To: ${req.originalUrl}`);
    next(); // Move on to the next phase
  }

// Now applying middleware to the all routes.  
app.use(logRequest);
// ----------------------------------------------------------------------------------

app.get('/', function (req, res) {
  res.send('Welcome to our Hotel')
})

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000')
})