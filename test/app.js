// basic web server
// a web server uses HTTP to serve files that form
// web pages to users in response to requests

const http = require('http'); // core module so no need for npm install
const fs = require('fs'); // file system module

const hostname = '127.0.0.1';
const port = '3000';

fs.readFile('index.html', (err, html) => { // arrow function for callback
	if (err) {
		throw err;
	}

	const server = http.createServer((req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-type', 'text/html'); // text/plain just prints, text/html parses HTML code
		res.write(html);
		res.end();
	});

	server.listen(port, hostname, () => {
		console.log('Server started on port ' + port);
	})
});

