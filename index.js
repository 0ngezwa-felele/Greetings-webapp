const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

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
// const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeting';

const pool = new Pool({
    connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeting',
    ssl: {rejectUnauthorized: false}
});


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
app.get('/', async function (req, res) {
    try {
        res.render('index', {
            greeted: greet.getPlease(), count: await greet.counter1()
        })
    } catch (error) {
        console.log(error)
    }
    
})

// Greeting and error messsages
app.post('/greeting', async function (req, res) {
    let myName = req.body.inputName;
    let lang = req.body.language;
    let regularExp = /^[A-Za-z]+$/;
    try{
    if (lang && myName) {
        if (!regularExp.test(myName)) {
            req.flash('info', 'Please enter your name in a correct format!');
        } else {
            await greet.greetPlease(lang, myName)
            await greet.duplicates(myName)
        }
        

    }
    else {

        
        if (!myName && !lang) {
            req.flash('info', 'Please type in name and select a language!');
        }
        else if (!lang) {
            req.flash('info', 'Please select a language!');

        }

        else if (myName === '') {
            req.flash('info', 'Please enter your name!');
        }
    }
    
    }catch(error){
        console.log(error)
    }

   
    
    res.redirect('/')

    
})

app.get('/greeted', async function (req, res) {
    try {
        res.render('greetings', { greeted: await greet.getText() })
    } catch (error) {
        console.log(error)
    }
   
})
// Dynamic Route
app.get('/counter/:inputName', async function (req, res) {
    try {
        let name = req.params.inputName
    var namesList = await greet.counting()
    // console.log(name + " sdsdsdsds")
    res.render('counter', {
        name: name,
        personsCounter: namesList
    })
    
    } catch (error) {
        console.log(error)
    }
    // console.log(nameList);
})

app.post('/reset', async function (req, res) {
    try {
        await greet.reset()
        res.redirect('/')

    } catch (error) {
        console.log(error)
    }
    });

// setting a port for the app to display
const PORT = process.env.PORT || 2016
app.listen(PORT, function () {
    console.log('App started at port:', PORT)
})
