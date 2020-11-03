class CloudVisionUtils {

	/**
	 * 
	 * @param {ImageAnnotatorClient} client 
	 */
	constructor(client) {
		this.client = client;
	}
	/**
	 * 
	 * @param {Array<String>} filenames filenames to annotate
	 */
	textDetection(filenames) {
		const textDetectionRequests = filenames.map((file) => {
			return this.client.textDetection(file);
		});
		return Promise.all(textDetectionRequests);
	}
}

module.exports = CloudVisionUtils; 