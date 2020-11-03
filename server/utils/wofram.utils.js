const childProcess = require('child_process');
const { connect } = require('http2');

class WolframUtils {
	constructor(scriptRoot) {
		this.scriptRoot = scriptRoot;
		this.wolframCommand = 'wolframscript'; // wolframscript.exe on windows
	}

	/**
	 * runs a wolfram script with the given flags
	 * @param {String} scriptName name of the script to run (without wls extension)
	 * @param  {...String} flags flags to append to the command (will become space separated)
	 */
	sendCommand(scriptName, ...flags) {
		return new Promise((res, rej) => {
			try {
				childProcess.exec(`${this.wolframCommand} -file ${this.scriptRoot + scriptName}.wls ${flags.join(' ')}`, (error, stdout, stderr) => {
					if (error) console.log(error);
					if (stderr) console.log(stderr);
					console.log(stdout);
					res(stdout);
				});
			} catch (e) {
				console.log(e);
				rej(e);
			}
		});
	}

	/**
	 * crops the given image into its objects from the cloud vision API
	 * @param {String} filename filename to crop
	 * @param {*} result results from google cloud vision api for the image
	 */
	async cropLocalizedObjects(filename, result) {
		const cropScript = 'cropVertices';
		const objects = result.localizedObjectAnnotations;
		const objectsCropped = objects.map(objects => {
			const boundingPoly = objects.boundingPoly;
			const topLeft = boundingPoly.normalizedVertices[0];
			const bottomRight = boundingPoly.normalizedVertices[2];
			return this.sendCommand(cropScript, filename, topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);
		});
		const filenames = await Promise.all(objectsCropped);
		return filenames.map((file) => {
			return file.substring(0, file.length - 1); // remove the \n from the filename
		});
	}

	/**
	 * removes the background from an image
	 * @param {string} filename filename to remove the background from
	 */
	removeBackground(filename) {
		const removeBackgroundScript = 'removeBackground';
		return this.sendCommand(removeBackgroundScript, filename);
	}
}

module.exports = WolframUtils;