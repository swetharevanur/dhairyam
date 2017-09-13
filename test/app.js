const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // core module so no need for npm install

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

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// set static path for resources 
app.use(express.static(path.join(__dirname, 'public')))

const people = [
	{
		name: 'Bill',
		age: 72
	},
	{
		name: 'Dave',
		age: 81
	}
]

// GET request
app.get('/', (req, res) => {
	res.json(people); // parsing an array of objects
})

app.listen(port, hostname, () => {
	console.log('Server started on port ' + port);
})