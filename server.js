const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

//sets global variable to be able to call the base directory from anywhere in document
global.__basedir = __dirname;

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
      }),    
};

app.use(session(sess));

const hbs = exphbs.create(
  { 
    helpers,
    partialsDir: path.join(__dirname, "views/partials"),
  }
  );

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//"This is whipped cream in coffee goin on right here" -John "Class Instructor" Dinsmore
//Add static assets to the public folder so all files should start as though they come from the public folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/js', express.static(__dirname + '/node_modules/moment/dist'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });  