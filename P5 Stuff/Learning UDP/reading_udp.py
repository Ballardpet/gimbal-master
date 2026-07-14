import socket

def parseP5(message):
    print("Here's what the function recieves:", message)
    # Isolate callsign
    callsign = message[129:140]
    print("callsign", callsign)

    # Message contains a callsign, so parse
    if b'CALLSGN' in callsign:
        print("This is a P5 message")
        # From here:
            # Extract identification (callsign?)
            # Exctract LLA
            # Maybe add a timestamp
                # Last updated at xx:xx:xx
                # maybe delete if it hasn't been updated in a while
            # Save it to an array or something
                # Update array if its callsign/id exists
                # Add as new object if it does exist
            # At some point make it accessable by the rest of the program
                # Something nice and easy like JSON so I don't really have to change anything in gimbal_server
    
    # Message does not contain a callsign, so don't parse
    else:
        print("This is not a P5 message")

HOST = "0.0.0.0"  # Listen on all interfaces

PORT = 3000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((HOST, PORT))

print(f"Listening on UDP port {PORT}...")

try:
    while True:
        data, addr = sock.recvfrom(4096)  # Buffer size in bytes
        parseP5(data)
        #print(f"Received {len(data)} bytes from {addr}:")
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