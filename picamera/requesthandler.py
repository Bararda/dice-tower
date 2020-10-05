import json
import requests

class RequestHandler:

	serverUrl = '10.0.0.10/images'

	@staticmethod
	def post(data):
		r = requests.post(RequestHandler.serverUrl, json=data)
		return r

	@staticmethod
	def get(params):
		r = requests.get(RequestHandler.serverUrl, params=params)
		return r

	@staticmethod
	def put(params, data):
		r = requests.put(RequestHandler.serverUrl, json=data, params=params)
		return r

	@staticmethod
	def delete(params):
		r = requests.delete(RequestHandler.serverUrl, params=params)
		return r
