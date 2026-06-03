Simple setup & start
 - download node.js
 - start by downloading drivers
    - SDR: https://www.rtl-sdr.com/rtl-sdr-quick-start-guide/
      -   Zadig is a useful tool for downloading this driver
    - usb to rs485 converter: download through device manager
 - check the COM port of your usb to rs485 adapter
   - if not COM4, go to /gimbal-server/src/pelcoBuilder.js and change the path of port to the appropriate port.
 - ensure you are in the main "gimbal-master" directory
 - enter ".\install.bat" for initial installation of dependencies
    - follow extra instructions for Dump1090
      - run setup.exe and enter location
      - run dump1090.exe for the first time to download aircraft csv
 - enter ".\start.bat" to run full program
    - go to "http://localhost:5173/" for gimbal control
      - copy flight icao from map and enter here to track aircraft
    - go to "http://localhost:8080/" for map of local aircraft


Physical calibration
 - set gibal to be level
 - calibrate coordinates:
    - go to /gimbal-vite/src/components/GPS.jsx
    - adjust start lat,lon, and el (lines ~8-10) to your current LLA
    - can alternatively enter current coordinates on web front end and press "point to" to set current coordinates
 - on web front end:
    - calibrate direction:
        - set destination azimuth to 180 and destination elevation to 90
        - adjust gimbal so that plate points north


Hardware
 - Will-Burt AP-8 Accupoint Positioner
 - RTL2832U SDR