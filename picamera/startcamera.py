from picamera import PiCamera
from time import sleep
from photomanager import PhotoManager
from gpiozero import Button

button = Button(2)

while True:
    button.wait_for_press()
    try:
        camera = PiCamera()
        # Maybe TO-DO specify more camera options (like brightness)
        camera.start_preview()
        sleep(2)  # Camera Warm up
        camera.capture('image_test.jpg')
        PhotoManager.sendFile('image_test.jpg')
        pass
    finally:
        camera.close()
