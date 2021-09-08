const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const greeting = require('./greetings');
const session = require('express-session');
// DB
const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// DB connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeting';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});


const app = express();
const greet = greeting(pool);

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
// (default route)
app.get('/', function (req, res) {
        res.render('index',{
        greeted: greet.getPlease(), count: greet.counter1()})
    })

    // Greeting and error messsages
    app.post('/greeting', function (req, res) {
        let myName = req.body.inputName;
        let lang = req.body.language;


        console.log(myName);
        console.log(lang);

        if (myName !== '') {
            if (lang === 'Isixhosa' || lang === 'English' || lang === 'Sepedi') {
                greet.greetPlease(lang, myName)
                greet.setNames(myName)

            } else {
                req.flash('info', 'select a language');
            }

        } else {
            req.flash('info', 'Please type in name and select a language');
        }

        res.redirect('/')

    })

    app.get('/greeted', function (req, res) {
        res.render('greetings', { greeted: greet.getText() })
    })
    // Dynamic Route
    app.get('/counter/:inputName', function (req, res) {
        let name = req.params.inputName
        var namesList = greet.getText()
        console.log(name + " sdsdsdsds")
        res.render('counter', {
            name: name,
            personsCounter: namesList[name]
        })
    })



    // setting a port for the app to display
    const PORT = process.env.PORT || 2016
    app.listen(PORT, function () {
        console.log('App started at port:', PORT)
    })
