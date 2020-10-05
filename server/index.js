const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
	throw result.error;
}

const app = express();

const port = process.env.PORT;
const fs = require('fs');

let fileCount = 0;
fs.readdir('./images', (err, files) => {
	console.log(`Found ${files.length} files`);
	fileCount = files.length;
});

app.use(bodyParser.json({limit: '10mb'}));

app.post('/images', (req, res, next) => {
	const { image } = req.body;
	const bitmap = Buffer.from(image, 'base64');
	fs.writeFileSync(`./images/${fileCount}.jpg`, bitmap);
	console.log('******** File created from base64 encoded string ********');
	res.sendStatus(201);
});

app.listen(port || 80, () => {
	console.log(`Server Listening on port ${port}`);
});