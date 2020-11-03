const express = require('express');
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');
const dotenv = require('dotenv');
const result = dotenv.config();
const client = new vision.ImageAnnotatorClient({keyFilename: process.env.keyFilename});

const { WolframUtils, ImageUtils, CloudVisionUtils } = require('./utils');

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
	const filename = `${fileCount}.jpg`
	const imageUtils = new ImageUtils();
	await imageUtils.createImageFromBase64String(image, filename);
	res.sendStatus(201);

	const wolframScriptPath = './wolfram/'
	const wolframUtils = new WolframUtils(wolframScriptPath);
	await wolframUtils.removeBackground(filename);
	const [result] = await client.objectLocalization(`./wolfram/images/${filename}`);
	const croppedImages = await wolframUtils.cropLocalizedObjects(filename, result);
	console.log(croppedImages);
	const cloudVisionUtils = new CloudVisionUtils(client);
	const detections = await cloudVisionUtils.textDetection(croppedImages);

	detections.forEach(file => file.forEach((text) => console.log(text)));;

	fileCount++;
});

app.listen(port || 80, () => {
	console.log(`Server Listening on port ${port}`);
});