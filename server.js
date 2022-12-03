const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const hbs = exphbs.create({
    helpers
});


const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
  };
  
const app = express();
const PORT = process.env.PORT || 3001;

  app.use(session(sess));
  
  // Sets handlebars as html to be served
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  
  // Defines all folders to be served
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(routes);

//listening to port
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);