const fs = require('fs').promises

class ImageUtils {

	/**
	 * creates an image from a base64 string and saves it to the images folder
	 * @param {*} base64String base64 encoded image
	 * @param {*} filename filename to save the image as
	 */
	createImageFromBase64String(base64String, filename) {
		const bitmap = Buffer.from(base64String, 'base64');
		const fileWritten = fs.writeFile(`./images/${filename}`, bitmap);
		console.log('******** File created from base64 encoded string ********');
		return fileWritten;

	}
}

module.exports = ImageUtils;