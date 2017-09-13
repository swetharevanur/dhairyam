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

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// set static path for resources 
app.use(express.static(path.join(__dirname, 'public')))

// GET request
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Customers'
	});
})

app.listen(port, hostname, () => {
	console.log('Server started on port ' + port);
})