// app.js

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars'); // 👈 Handlebars engine

const indexRouter = require('./routes/index');
const itemsRouter = require('./routes/items');

const app = express();

// ---------------------
// View Engine Setup
// ---------------------
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main', // Loads views/layout/main.hbs
  layoutsDir: path.join(__dirname, 'views', 'layouts') // Layout directory
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ---------------------
// Middleware
// ---------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------
// Routes
// ---------------------
app.use('/', indexRouter);
app.use('/items', itemsRouter);

// ---------------------
// MongoDB Connection
// ---------------------
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ---------------------
// Export the App
// ---------------------
module.exports = app;
