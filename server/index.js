const express = require('express');
const bodyParser = require('body-parser');
const childProcess = require('child_process');
const vision = require('@google-cloud/vision');
const dotenv = require('dotenv');
const result = dotenv.config();
const client = new vision.ImageAnnotatorClient({keyFilename: process.env.keyFilename});

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

app.post('/images', async (req, res, next) => {
	const { image } = req.body;
	const bitmap = Buffer.from(image, 'base64');
	const filename = `${fileCount}.jpg`
	const wolframScriptPath = './wolfram/'
	const removeBackgroundScript = 'removeBackground.wls'
	const cropScript = 'cropVertices.wls'
	fs.writeFileSync(`./images/${filename}`, bitmap);
	console.log('******** File created from base64 encoded string ********');

	childProcess.execSync(`wolframscript.exe -file ${wolframScriptPath + removeBackgroundScript} ${filename}`);

	const [result] = await client.objectLocalization(`./wolfram/images/${filename}`);
	const objects = result.localizedObjectAnnotations;
	objects.forEach(objects => {
		const boundingPoly = objects.boundingPoly;
		const topLeft = boundingPoly.normalizedVertices[0];
		const bottomRight = boundingPoly.normalizedVertices[2];
		childProcess.execSync(`wolframscript.exe -file ${wolframScriptPath + cropScript} ${filename} ${topLeft.x} ${topLeft.y} ${bottomRight.x} ${bottomRight.y}`);
	});
	fileCount++;
	res.sendStatus(201);
});

app.listen(port || 80, () => {
	console.log(`Server Listening on port ${port}`);
});