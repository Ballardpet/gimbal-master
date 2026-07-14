import socket
from datetime import datetime
import struct
import pymap3d as pm

aircraft_dict = {}

class Aircraft:
    def __init__(self):
        self.callsign = ""
        self.lat = 0.0
        self.lon = 0.0
        self.alt = 0.0
        self.timestamp = None

        # self.site = 0
        # self.application = 0
        # self.entity = 0

        # self.force_id = 0

        # self.entity_kind = 0
        # self.entity_domain = 0
        # self.entity_country = 0
        # self.entity_category = 0
        # self.entity_subcategory = 0
        # self.entity_specific = 0
        # slf.entity_extra = 0
    def print(self):
        print("Callsign:", self.callsign, "lat:", self.lat, "lon:", self.lon, "alt:", self.alt, "last updated:", self.timestamp)

def parseP5(message):
    # print("Here's what the function recieves:", message)
    # Isolate callsign
    callsign = message[129:140].rstrip(b"\x00").decode("ascii")
    # print("callsign", callsign)

    # Message contains a callsign, so parse
    if 'CALLSGN' in callsign or 'GND' in callsign: # Might need to change this. I Keep getting GND consistently. Maybe this is grounded planes
        # print("This is a P5 message")
        # aircraft_id = callsign[len("CALLSGN"):]
        aircraft_id = callsign # Maybe leave "CALLSGN" in. If we are getting other signs like "GND" for ground or something

        # make a threat type variable. for ground vs air. have ID and callsign/ground separate. Or, just leave it as one big thing
        
        # unpack appropriate bytes, convert to a decimal, then un-tuple
        ecef_x = struct.unpack(">d", message[48:56])[0]
        ecef_y = struct.unpack(">d", message[56:64])[0]
        ecef_z = struct.unpack(">d", message[64:72])[0]

        # Convert from ECEF to decimal GPS
        lat, lon, alt = pm.ecef2geodetic(ecef_x, ecef_y, ecef_z)
        
        timestamp = datetime.now() # Maybe periodically delete old aircraft from array        
        """
        aircraft = Aircraft()
        aircraft.callsign = aircraft_id
        aircraft.lat = lat
        aircraft.lon = lon
        aircraft.alt = alt
        aircraft.timestamp = timestamp
        """

        if callsign not in aircraft_dict:
            aircraft = Aircraft()
            aircraft.callsign = aircraft_id
            aircraft.lat = lat
            aircraft.lon = lon
            aircraft.alt = alt
            aircraft.timestamp = timestamp

            aircraft_dict[callsign] = aircraft
        else:
            aircraft = aircraft_dict[callsign]

            aircraft.lat = lat
            aircraft.lon = lon
            aircraft.alt = alt
            aircraft.timestamp = timestamp

        # print(aircraft_id, lat, lon, alt, timestamp)
        aircraft.print()

        # From here:
            # Extract identification (callsign?)
            # Exctract LLA
                # I think LLA is in ECEF, not gps coordinates. Will have to adjust appropriately.
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
        # print(f"Received {len(data)} bytes from {addr}:")
        # print(data)

except KeyboardInterrupt:
    print("\nStopping receiver...")

finally:
    sock.close()
    print("Socket closed.")

# This can read info from multiple sources at once. Seems to handle udp send 1 & 2 at the same time. Generally I can assume how it will work for receiving P5

# Next step is to test saving the information it receives. Maybe send something more complex like an object. Then have this program store an array of objects. 
# Then update on receieve. Or update every second. Something like that.

# Refer to notes in notebook on 7/13/2026 to proceed



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