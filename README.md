Setup
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
    - enter "./dump1090 --net --write-json /tmp/dump1090"
    - this converts incoming ads-b transmissions into something usable by the back end
    - go to http://localhost:8080/ for a live map of local aircraft
    - can select aircraft off the map
    - once an aircraft is selected, can get hex code from url
    - copy hex code, paste into front end, and select track to track that aircraft

