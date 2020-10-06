Pi Camera Project
---
On your Raspberry PI
1. Install Pyton if its not already installed `sudo apt install python3.8`
2. Install pip3 `sudo apt install -y python3-pip`
3. Copy the folder ./picamera onto your pi (this can be done using the scp command)
3. Install dependancies by running the setup.py file TODO test this

On your server  
1. in the ./server folder run `npm update` and `npm install`
2. in the ./server folder create an images folder `mkdir images` this is where images from the pi will be stored and where the wolfram script will look for images
3. in the ./server/wolfram folder create an images folder `mkdir images` this is where the wolfram scripts will create modified images
3. run `npm start`
4. install the google cloud SDK
5. Make sure you have your google account setup to properly use your google api authenitcation
