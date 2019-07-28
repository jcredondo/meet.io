const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes');

const db = require('./config/db');
require('./models/users');
db.sync().then(() => console.log('DB conectada')).catch((error) => console.log(error));

require('dotenv').config({ path: '.env' });



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.mensagens = req.flash();
    const data = new Date();
    res.locals.year = data.getFullYear();
    next();
});

app.use('/', router());



app.listen(process.env.PORT, () => {
    console.log('Server running on ' + process.env.PORT);
});