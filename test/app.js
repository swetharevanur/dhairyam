const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // core module so no need for npm install

const hostname = 'localhost';
const port = '3000';

const app = express();

// custom middleware
const logger = function(req, res, next) {
	console.log('Logging...');
	next();
}

app.use(logger);

// GET request
app.get('/', (req, res) => {
	res.send('Hello World'); // res.write() needs res.end() to send
})

app.listen(port, hostname, () => {
	console.log('Server started on port ' + port);
})

// fs.readFile('index.html', (err, html) => { // arrow function for callback
// 	if (err) {
// 		throw err;
// 	}

// 	const server = http.createServer((req, res) => {
// 		res.statusCode = 200;
// 		res.setHeader('Content-type', 'text/html'); // text/plain just prints, text/html parses HTML code
// 		res.write(html);
// 		res.end();
// 	});

// 	server.listen(port, hostname, () => {
// 		console.log('Server started on port ' + port);
// 	})
// });

