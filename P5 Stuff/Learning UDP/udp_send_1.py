import socket
import time

HOST = "127.0.0.1"  # Receiver's IP address
PORT = 5000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

count = 1

try:
    while True:
        message = f"From UDP 1! Packet #{count}".encode("utf-8")
        sock.sendto(message, (HOST, PORT))
        print(f"Sent: {message.decode()}")

        count += 1
        time.sleep(0.5)

except KeyboardInterrupt:
    print("\nStopping sender.")
    sock.close()