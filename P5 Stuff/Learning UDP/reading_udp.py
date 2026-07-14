import socket
from datetime import datetime
# converting data into ecef
import struct
# converting ecef to gps coordinates
import pymap3d as pm
# using threads
import threading 
import time

aircraft_dict = {}

class Aircraft:
    def __init__(self):
        self.callsign = ""
        self.lat = 0.0
        self.lon = 0.0
        self.alt = 0.0
        self.timestamp = None

    def print(self):
        print("Callsign:", self.callsign, "lat:", self.lat, "lon:", self.lon, "alt:", self.alt, "last updated:", self.timestamp)

# How to print/export json for the other program
# To-Do here:
    # Delete entries that haven't been updated in a while
    # Convert to JSON instead of text
    # Put it somewhere the other program can access
def exportDictionary():
    while True: 
        print("Current Aircraft")
        # Add "list()" so that there aren't issues if the dictionary changes size mid-run
        for aircraft in list(aircraft_dict.values()):
            aircraft.print()
        time.sleep(0.5)

def parseP5(message):
    # Isolate callsign
    callsign = message[129:140].rstrip(b"\x00").decode("ascii")

    # Message contains a callsign, so parse
    if 'CALLSGN' in callsign or 'GND' in callsign:

        # maybe make a threat type variable. for ground vs air. have ID and callsign/ground separate. Or, just leave it as one big thing
        
        # unpack appropriate bytes, convert to a decimal, then un-tuple
        ecef_x = struct.unpack(">d", message[48:56])[0]
        ecef_y = struct.unpack(">d", message[56:64])[0]
        ecef_z = struct.unpack(">d", message[64:72])[0]

        # Convert from ECEF to decimal GPS
        lat, lon, alt = pm.ecef2geodetic(ecef_x, ecef_y, ecef_z)
        
        # Track the last time the aircraft info was updated
        timestamp = datetime.now() # Maybe periodically delete old aircraft from array        


        # If calsign not in dictionary, create new aircaft and add to dictionary
        if callsign not in aircraft_dict:
            aircraft = Aircraft()
            aircraft.callsign = callsign
            aircraft_dict[callsign] = aircraft
        
        # retrieve aircraft by callsign
        aircraft = aircraft_dict[callsign]

        # update aircraft with new info
        aircraft.lat = lat
        aircraft.lon = lon
        aircraft.alt = alt
        aircraft.timestamp = timestamp
    
    # Message does not contain a callsign, so don't parse
    else:
        print("This is not a P5 message")

HOST = "0.0.0.0"  # Listen on all interfaces

PORT = 3000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((HOST, PORT))

print(f"Listening on UDP port {PORT}...")

# create new thread. say that its job will be to run exportDictionary
    # no parenthesis. we're giving it the function, not calling it
export_thread = threading.Thread(target=exportDictionary)
# tells the thread to end when the program does. otherwise it runs forever since it has "while True"
export_thread.daemon = True
# actually stars the thread
export_thread.start()

try:
    while True:
        data, addr = sock.recvfrom(4096)  # Buffer size in bytes
        parseP5(data)

except KeyboardInterrupt:
    print("\nStopping receiver...")

finally:
    sock.close()
    print("Socket closed.")



# Other info to consider
"""
        # Entity Identifier
        site = struct.unpack(">H", message[12:14])[0]
        application = struct.unpack(">H", message[14:16])[0]
        entity = struct.unpack(">H", message[16:18])[0]

        # Force Information
        force_id = message[18]

        # Entity Type
        entity_kind = message[20]
        entity_domain = message[21]
        entity_country = struct.unpack(">H", message[22:24])[0]
        entity_category = message[24]
        entity_subcategory = message[25]
        entity_specific = message[26]
        entity_extra = message[27]



        print(f"Site: {site}")
        print(f"Application: {application}")
        print(f"Entity: {entity}")
        print(f"Force ID: {force_id}")

        print(f"Entity Kind: {entity_kind}")
        print(f"Entity Domain: {entity_domain}")
        print(f"Entity Country: {entity_country}")
        print(f"Entity Category: {entity_category}")
        print(f"Entity Subcategory: {entity_subcategory}")
        print(f"Entity Specific: {entity_specific}")
        print(f"Entity Extra: {entity_extra}")
"""