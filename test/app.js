const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // core module so no need for npm install
const expressValidator = require('express-validator');

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

const users = [
	{
		id: 1,
		first_name: "Bill",
		last_name: "Hewlett",
		email: "bill@gmail.com"
	},
	{
		id: 2,
		first_name: "Dave",
		last_name: "Packard",
		email: "dave@gmail.com"
	},
	{
		id: 3,
		first_name: "John",
		last_name: "Doe",
		email: "john@gmail.com"
	}
]

// GET request
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Customers',
		users: users
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



