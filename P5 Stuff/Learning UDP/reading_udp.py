import socket

HOST = "0.0.0.0"  # Listen on all interfaces
# HOST = "192.168.1.205"  # My address

PORT = 3000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((HOST, PORT))

print(f"Listening on UDP port {PORT}...")

try:
    while True:
        data, addr = sock.recvfrom(4096)  # Buffer size in bytes
        print(f"Received {len(data)} bytes from {addr}:")
        print(data)

except KeyboardInterrupt:
    print("\nStopping receiver...")

finally:
    sock.close()
    print("Socket closed.")

# This can read info from multiple sources at once. Seems to handle udp send 1 & 2 at the same time. Generally I can assume how it will work for receiving P5

# Next step is to test saving the information it receives. Maybe send something more complex like an object. Then have this program store an array of objects. 
# Then update on receieve. Or update every second. Something like that.

# Refer to notes in notebook on 7/13/2026 to proceed