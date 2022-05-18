var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Grid = require('gridfs-stream')

var indexRouter = require('./routes/index');
var tutorsRouter = require('./routes/tutors');
var studentRouter = require('./routes/students');
var appointmentRouter = require('./routes/appointments');
var courseRouter = require('./routes/courses');
var authRouter = require('./routes/authentication');
var favoriteRouter = require('./routes/favorites')
var feedBackRouter = require('./routes/feedback')

var app = express();
var cors = require('cors');
app.use(cors('*'))

// for image upload ++ start
app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({limit:'50mb', extended:true}))
// ++ end

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/tutors', tutorsRouter);
app.use('/students', studentRouter)
app.use('/appointment', appointmentRouter)
app.use('/courses', courseRouter)
app.use('/favorite', favoriteRouter)
app.use('/feedback', feedBackRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// app.get('file/:filename', async(req, res)=>{
//   try{
//     const file = await gfs.file.findOne({filename:req.params.filename});
//     const readStream = gfs.createRreadStream(file.filename);
//     readStream.pipe(res)
//   }
//   catch(error){
//     res.send("not found")
//   }
// })

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
