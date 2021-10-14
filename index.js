const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const bodyParser = require('body-parser');
const flash = require('express-flash');
const greeting = require('./greetings');
const session = require('express-session');
const routes = require('./routes/route');
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
    connectionString: process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeting',
    ssl: {rejectUnauthorized: false}
});


const greet = greeting(pool);
const greetingRoute = routes(greet);

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
app.get('/', greetingRoute.all)


// Greeting and error messsages
app.post('/greeting', greetingRoute.greetError)
    


app.get('/greeted',greetingRoute.greetedNames)
// Dynamic Route
app.get('/counter/:inputName', greetingRoute.counter2)
    // console.log(nameList);


app.post('/reset',greetingRoute.resetting);
    

// setting a port for the app to display
const PORT = process.env.PORT || 2016
app.listen(PORT, function () {
    console.log('App started at port:', PORT)
})
