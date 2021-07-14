import time
import picamera

with picamera.PiCamera() as camera:
        camera.start_preview()
        time.sleep(2)
        camera.capture_sequence([
            "image1.jpg",
            "image2.jpg",
            "imgae3.jpg"
            ])
        camera.stop_preview()

