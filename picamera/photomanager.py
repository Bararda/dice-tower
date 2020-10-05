import base64
from requesthandler import RequestHandler
class PhotoManager:

	@staticmethod
	def convertImageToBase64(filename):
		with open(filename, 'rb') as image_file:
			encoded = base64.b64encode(image_file.read())
			return encoded

	@staticmethod
	def sendFile(filename):
		base64Image = PhotoManager.convertImageToBase64(filename)
		RequestHandler.post({'image': base64Image.decode()})
		