import time
import picamera

import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(4, GPIO.OUT)
GPIO.output(4, False)

#with picamera.PiCamera() as camera:
#        camera.start_preview()
#        time.sleep(2)
#        camera.capture_sequence([
#            "image1.jpg",
#            "image2.jpg",
#            "imgae3.jpg"
#            ])
#        camera.stop_preview()

with picamera.PiCamera() as camera2:
    camera2.resolution = (2592, 1944)
    camera2.exif_tags['IFD0.Copyright'] = 'Author: Aaditya-Synthic'
    camera2.sharpness = 50
    camera2.exposure_mode = 'antishake'
    camera2.annotate_text = 'Synthic-Thermal'
    #camera2.capture('/home/pi/synthic/hard/assets' % ticks)
    camera2.capture_sequence([
            "image1.jpg",
            "image2.jpg",
            "imgae3.jpg"
            ])

#    while True:
#        GPIO.wait_for_edge(17, GPIO.FALLING)
#        GPIO.output(4, True)
#        ticks = time.time()
#        GPIO.output(4, False)
