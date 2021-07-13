import RPi.GPIO as GPIO
import time
import signal
import sys
import RPi.GPIO as GPIO
from time import sleep

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
        set_time=5
        timmer = "start"
        while timmer =="start":
            timmer=set_time-1
            print("Remaining time to dispance",timmer)
        
        GPIO.output(In1,GPIO.LOW)
        GPIO.output(In1,GPIO.HIGH)
        pwm.ChangeDutyCycle(50)
        GPIO.output(In1,GPIO.LOW)
        print("Please move forward")
        time.sleep(10)

        

        
        
        