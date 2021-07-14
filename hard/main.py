import time
import picamera
import base64


def convert_img_to_b64():
    with open("imagex.jpg", "rb") as img:
        stringx = base64.b64encode(img.read())
    print(stringx)
    return stringx


def capture_image():
    with picamera.PiCamera() as camera:
        camera.start_preview()
        time.sleep(2)
        camera.capture_sequence([
            "imagex.jpg"
            ])
        camera.stop_preview()
        convert_img_to_b64()
capture_image()



