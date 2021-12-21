from picamera import PiCamera
from time import sleep
from photomanager import PhotoManager
import asyncio
from kasa import Discover, SmartPlug


async def main():
    devices = await Discover.discover()
    firstDevice = list(devices.keys())[0]
    plug = SmartPlug(firstDevice)
    while True:
        try:
            camera = PiCamera()
            camera.start_preview()
            await plug.turn_on()
            await asyncio.sleep(2)
            await plug.turn_off()
            await asyncio.sleep(5)
            # Maybe TO-DO specify more camera options (like brightness)
            camera.capture('image_test.jpg')
            PhotoManager.sendFile('image_test.jpg')
            pass
        finally:
            camera.close()

asyncio.run(main())
