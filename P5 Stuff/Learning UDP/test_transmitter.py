import socket
import struct
import time
import pymap3d as pm

DEST_IP = "127.0.0.1"      # Change to your receiver's IP if on another PC
DEST_PORT = 3000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

lat = 34.000000
lon = -118.000000
alt = 1000.0

while True:
    packet = bytearray(144)

    # --------------------------
    # PDU Header
    # --------------------------
    packet[0] = 6          # protocolVersion
    packet[1] = 95         # exerciseID
    packet[2] = 1          # Entity State PDU
    packet[3] = 1          # protocolFamily

    struct.pack_into(">I", packet, 4, 0)       # timestamp
    struct.pack_into(">H", packet, 8, 144)     # pduLength
    struct.pack_into(">H", packet, 10, 0)      # padding

    # --------------------------
    # Entity Identifier
    # --------------------------
    struct.pack_into(">H", packet, 12, 1)      # site
    struct.pack_into(">H", packet, 14, 1)      # application
    struct.pack_into(">H", packet, 16, 1)      # entity

    # --------------------------
    # Force Info
    # --------------------------
    packet[18] = 1
    packet[19] = 0

    # --------------------------
    # Entity Type
    # --------------------------
    packet[20] = 1
    packet[21] = 2
    struct.pack_into(">H", packet, 22, 225)    # USA
    packet[24] = 1
    packet[25] = 0
    packet[26] = 0
    packet[27] = 0

    # --------------------------
    # Velocity (leave zero)
    # --------------------------

    # --------------------------
    # Location (ECEF)
    # --------------------------
    x, y, z = pm.geodetic2ecef(lat, lon, alt)

    struct.pack_into(">d", packet, 48, x)
    struct.pack_into(">d", packet, 56, y)
    struct.pack_into(">d", packet, 64, z)

    # --------------------------
    # Orientation (leave zero)
    # --------------------------

    # --------------------------
    # Entity Marking
    # --------------------------
    packet[128] = 1                     # character set

    callsign = "CALLSGN1"
    packet[129:129+len(callsign)] = callsign.encode("ascii")

    # --------------------------
    # Capabilities
    # --------------------------

    sock.sendto(packet, (DEST_IP, DEST_PORT))

    print(f"Sent {callsign}: {lat:.6f}, {lon:.6f}, {alt:.1f}")

    lat += 0.00005      # Move north a tiny bit

    time.sleep(0.5)