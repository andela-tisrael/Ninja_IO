const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');
const app = express();

var db;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// tomly1:tomilayo@ds149258.mlab.com:49258/yoda

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://localhost:27017/star_wars', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000');
    })
});

app.get('/', function(req, res) {
    db.collection('quotes').find().toArray(function(err, results) {
        if (err) return console.log(err)
            // renders index.ejs
        res.render('index.ejs', { quotes: results, title: "Ninja Journal" });

    });
});

app.get('/todo', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err);

        //else render page
        res.render('todo.ejs', { quotes: result, title: "Ninja Journal" });
    });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs',{title: "Ninja Dashboard"});
});
app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});
app.get('/signin', (req, res) => {
    res.render('signin.ejs');
});
app.post('/quotes', function(req, res) {
    console.log((req.body.name === '' || req.body.quotes === ''));
    if (req.body.name === '' || req.body.quotes === '') {
        console.log('Cannot submit empty records');
        res.redirect('/');
    }
    db.collection('quotes').save(req.body, (err, result) => {

        if (err) return console.log(err); // logs error if problem occurs

        console.log('saved to database');

        res.redirect('/'); //redirects if done

    })
});

app.delete('/quotes', (req, res) => {
    console.log('hitting here');
    db.collection('quotes').remove();
});

app.put('/quotes', (req, res) => {
    // Handle put request
    db.collection('quotes')
        .findOneAndUpdate({
                name: 'Yoda',
            }, {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            },
            (err, result) => {
                if (err) return res.send(err);
                return res.send(result);
            }
        )
});
// Note: request and response are usually written as req and res respectively.
