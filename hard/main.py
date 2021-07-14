import time
import picamera
import base64
import RPi.GPIO as GPIO
import signal
import sys
import RPi.GPIO as GPIO
from time import sleep
import requests
import json

def convert_img_to_b64():
    with open("imagex.jpg", "rb") as img:
        stringx = base64.b64encode(img.read())
    return stringx


def capture_image_and_send_to_api():
    with picamera.PiCamera() as camera:
        camera.start_preview()
        time.sleep(2)
        camera.capture_sequence([
            "imagex.jpg"
            ])
        camera.stop_preview()
        b64 = convert_img_to_b64()
        # use api here
        sendDataToBackend(b64)

def sendDataToBackend(imgb64):
    url = 'http://localhost:5000/user/saveData'
    toBeSent = {"img" : imgb64}
    payload = json.dumps(toBeSent)
    header = {
        'Content-Type': 'application/json'
    }
    print('sending data to backend')
    r = requests.request("post", url, headers = header, data = payload)
    print(r.text)

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
Ena,In1,In2 = 17,27,22
GPIO.setup(Ena,GPIO.OUT)
GPIO.setup(In1,GPIO.OUT)
GPIO.setup(In2,GPIO.OUT)
pwm = GPIO.PWM(Ena,100)
pwm.start(0)

# set GPIO Pins
pinTrigger = 20
pinEcho = 21

def close(signal, frame):
    print("\nTurning off ultrasonic distance detection...\n")
    GPIO.cleanup() 
    sys.exit(0)

signal.signal(signal.SIGINT, close)

# set GPIO input and output channels
GPIO.setup(pinTrigger, GPIO.OUT)
GPIO.setup(pinEcho, GPIO.IN)

while True:
    # set Trigger to HIGH
    GPIO.output(pinTrigger, True)
    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(pinTrigger, False)

    startTime = time.time()
    stopTime = time.time()

# save start time
    while 0 == GPIO.input(pinEcho):
        startTime = time.time()

    # save time of arrival
    while 1 == GPIO.input(pinEcho):
        stopTime = time.time()

    # time difference between start and arrival
    TimeElapsed = stopTime - startTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2

    print ("Distance: %.1f cm" % distance)
    print (distance)
    time.sleep(1)
    
    if distance <=10:
        print ("Please put your hand below dispensor")
        print ('Capturing image...')
        capture_image_and_send_to_api()
        for i in range(3):
            sleep(1)
            print('Wait for ', 3 - i, 'sec...')
        
        GPIO.output(In1,GPIO.LOW)
        GPIO.output(In1,GPIO.HIGH)
        pwm.ChangeDutyCycle(30)
        print("Please move forward")
        time.sleep(1)
        GPIO.output(In1,GPIO.LOW)




