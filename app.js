const // npm package
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  // app setup
  app = express(),
  //models
  // routes
  indexRoutes = require('./routes/index')

//connecting to db

mongoose
  .connect('mongodb://localhost:27017/zgenny_scam', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message))

// app setup

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  express.static(__dirname + '/public'),
  require('express-session')({
    secret: 'Hello, my name is Riccardo and I practice  40 hours a day',
    resave: false,
    saveUninitialized: false,
  }),
  flash(),
  (req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
  }
)

app.set('view engine', 'ejs')

app.use('/', indexRoutes)

app.listen(process.env.PORT || 3000, () => {
  console.log('Scam Server is listening on PORT=3000')
})