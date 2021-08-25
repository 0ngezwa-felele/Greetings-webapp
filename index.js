const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const greeting = require('./greetings');
const session = require('express-session');

const app = express();
const greet = greeting();

// accessing public files
app.use(session({
    secret: 'add a secret',
    resave: false,
    saveUninitialized: true
}))
app.use(express.static('public'));
// Allowing files to communicate with each other(bodyParser)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())

// Setting view engine to handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// ROUTES
app.get('/', function (req, res) {
    res.render('index')
})
// Also storing the names greeted
app.post('/greeting', function (req, res) {
    let myName = req.body.inputName;
    let lang = req.body.language;
    // console.log(myName);
    // console.log(lang);

    // if (myName == '' & lang == '') {
    //     req.flash('info', 'Please type in name and select a language');
    // }
    // else if (myName == '') {
    //     req.flash('info', 'Please enter a name');
    // }
    // else if (lang == '') {
    //     req.flash('info', 'select a language');
    // }
    // else {  }
    greet.greetPlease(lang, myName)
    greet.setNames(myName)
    res.render('index', { greeted:  greet.getPlease()})
})
// setting a port for the app to display
const PORT = process.env.PORT || 1992
app.listen(PORT, function () {
    console.log('App started at port:', PORT)
})