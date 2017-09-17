const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // core module so no need for npm install
const expressValidator = require('express-validator');
const mongojs = require('mongojs')
const db = mongojs('dhairyamapp', ['states'])

const hostname = 'localhost';
const port = '3000';

const app = express();

/*
// custom middleware
const logger = function(req, res, next) {
	console.log('Logging...');
	next();
}

app.use(logger);
*/

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// set static path for resources 
app.use(express.static(path.join(__dirname, 'public')))

// make errors a global variable
app.use((req, res, next) => {
	res.locals.errors = null;
	next();
});

// load express-validator's error formatting middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value, location) {
		const namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}

		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// GET request
app.get('/', (req, res) => {
	db.users.find(function (err, docs) {
		console.log(docs);
		res.render('index', {
			title: 'Customers',
			users: docs
		});
	});	
});



// POST request
app.post('/users/add', (req, res) => {
	// specify validator rules
	req.checkBody('first_name', 'First name is required').notEmpty();
	req.checkBody('last_name', 'Last name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		res.render('index', {
			title: 'Customers',
			users: users,
			errors: errors
		});
	} else {
		const newUser = { // create new user object from form input
			first_name: req.body.first_name, // comes from first_name field
			last_name: req.body.last_name,
			email: req.body.email
		}

		console.log('SUCCESS');
	} 	
});

app.listen(port, hostname, () => {
	console.log('Server started on port ' + port);
});



