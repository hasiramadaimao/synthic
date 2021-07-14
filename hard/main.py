import time
import picamera

def capture_image():
    with picamera.PiCamera() as camera:
        camera.start_preview()
        time.sleep(2)
        camera.capture_sequence([
            "imagex.jpg"
            ])
        camera.stop_preview()

capture_image()
