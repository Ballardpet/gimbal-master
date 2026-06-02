Simple setup & start
 - start by downloading drivers
    - SDR: https://www.rtl-sdr.com/rtl-sdr-quick-start-guide/
    - usb to rs485 converter: download through device manager
 - ensure you are in the main "gimbal-master" directgory
 - enter ".\install.bat" for initial installation of dependencies
    - follow extra instructions for Dump1090
 - enter ".\start.bat" to run full program
    - go to "http://localhost:5173/" for gimbal control
    - go to "http://localhost:8080/" for map of local aircraft


Physical calibration
 - set gibal to be level
 - calibrate coordinates:
    - go to /gimbal-vite/src/components/GPS.jsx
    - adjust start lat,lon, and el (lines ~8-10) to your current LLA
    - can alternatively enter current coordinates on web front end and press "point to" to set current coordinates
 - on web front end:
    - calibrate direction:
        - set destination azimuth to 180 and destination elevation to -90
        - adjust gimbal so that plate points north


Setup
 - start by downloading drivers
    - SDR: https://www.rtl-sdr.com/rtl-sdr-quick-start-guide/
    -  usb to rs485 converter: download through device manager
 - gimbal-vite
    - cd to gimbal-vite
    - enter "npm i" in the command line to install dependencies
 - gimbal-server
    - cd to gimbal-server
    - enter "npm i" in the command line to install dependencies
 - Dump1090
    - open dump1090 folder
    - run setup.exe
    - enter current location
    - allow data to download


Running the program
 - gimbal-vite: the front end of the program
    - cd to gimbal-vite
    - enter "npm run dev" in the command line
    - go to http://localhost:5173/
    - this allows controll of the gimbal (as long as both other programs are running)
 - gimbal-server: the back end of the program
    - cd to gimbal-server
    - cd to src
    - enter "node server.js"
    - this will take instructions that you input from the front end and send them to the gimbal
 - Dump1090: open source ads-b decoder
    - used to take in ads-b data from nearby aircraft
    - cd to Dump1090
    - enter ".\dump1090.exe --interactive --net"
    - this converts incoming ads-b transmissions into something usable by the back end
    - go to http://localhost:8080/ for a live map of local aircraft
    - can select aircraft off the map
    - once an aircraft is selected, can get hex code from url
    - copy hex code, paste into front end, and select track to track that aircraft


Hardware
 - Will-Burt AP-8 Accupoint Positioner
 - RTL2832U SDR