const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const {expressjwt} = require('express-jwt');
const i18n = require('i18n');
const dotenv = require('dotenv');
dotenv.config();

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const skillsRoutes = require('./routes/skills');
const permissionRoutes = require('./routes/permissions');
const rolRoutes = require('./routes/roles');
const userStoryRoutes = require('./routes/userStories');
const projectRoutes = require('./routes/projects');
const boardRoutes = require('./routes/boards');
const columnRoutes = require('./routes/columns');
const releasesRoutes = require('./routes/releases');
const retrospectiveRoutes = require('./routes/retrospectives');
const sprintRoutes = require('./routes/sprints');
const developerRoutes = require('./routes/developers');

const jwtKey = config.get('secret.key');
const uri = process.env.MONGO_URI; 

const app = express();

mongoose.connect(uri);
const db = mongoose.connection;

db.on('open', () => {
  console.log('Conexión correcta');
});

db.on('error', () => {
  console.log('No se pudo conectar a la BD');
});

i18n.configure({
  locales:['es', 'en'],
  cookie: 'language',
  directory: `${__dirname}/locales`,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);
//app.use(expressjwt({ secret: jwtKey, algorithms: ['HS256'] }).unless({ path: ["/login"] }));

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/skills', skillsRoutes);
app.use('/permissions', permissionRoutes);
app.use('/roles', rolRoutes);
app.use('/userStories', userStoryRoutes);
app.use('/boards', boardRoutes);
app.use('/columns', columnRoutes);
app.use('/projects', projectRoutes);
app.use('/releases', releasesRoutes);
app.use('/retrospectives', retrospectiveRoutes);
app.use('/sprints', sprintRoutes);
app.use('/developers', developerRoutes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;