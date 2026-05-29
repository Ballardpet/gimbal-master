// Finding azimuth by coordinates: https://www.youtube.com/watch?v=EiI-Auqp764
    // I think we do the theata AB formula, use the gimbal as B, and use the result as the theta
    // Maybe use the haversin formula for distance to point, combine that with elevation difference for height, and use the two for elevation angle
import { pelcoBuilder } from "../pelcoBuilder.js";
import { gpsBuilder } from "../gpsBuilder.js";


// for reading from a file instead of using TCP
import fs from "fs/promises";
//const AIRCRAFT_PATH = "/tmp/dump1090/aircraft.json";
const AIRCRAFT_PATH = "\\\\wsl$\\Ubuntu\\tmp\\dump1090\\aircraft.json";

// PROBABLY MAKE THIS ITS OWN FILE! LIKE PELCOBUILDER! WILL NEED THESE FORMULAS FOR ADSB AND P5 PROBABLY!
class GpsService {

    async adsb(startLat, startLon, startEl, targetHexID){
        // call adsbAPI with hexid to get relevant aircraft
        //const url = `https://api.airplanes.live/v2/hex/${targetHexID}`;

        
        try {
            /*
            const response = await fetch(url);
            const data = await response.json();
           
            // This one for airplanes.live: 
            const target = data.ac[0]
            */


            const raw = await fs.readFile(AIRCRAFT_PATH, "utf-8");
            const data = JSON.parse(raw);

            const target = data.aircraft.find(
                ac => ac.hex && ac.hex.toLowerCase() === targetHexID.toLowerCase()
            );

            // Idk if this is the right format for returning the data I want
            // Make sure this is returning in JSON

            // use relevant aircraft info to get target LLA
            let targetLat = target.lat;
            let targetLon = target.lon;
            // barometric height; height above sea level, not ground
            let targetEl = target.alt_baro;

            // Reject invalid values
            if (![targetLat, targetLon, targetEl].every(Number.isFinite)) {
                return null;
            }

            // convert elevation from feet to meters
            targetEl = targetEl * 0.3048;
            // can call pointTo using startn and target LLA
            this.pointTo(startLat, startLon, startEl, targetLat, targetLon, targetEl)
            // Return target LLA
                // So that the user knows we're tracking (aside from the gimbal literally moving)
        
            // Idk if this is the right format for returning the data I want
            // Make sure this is returning in JSON
            return {
                lat: targetLat,
                lon: targetLon,
                el: targetEl
            };
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async pointTo(startLat, startLon, startEl, destLat, destLon, destEl) {
        console.log({
            startLat,
            startLon,
            startEl,
            destLat,
            destLon,
            destEl
        });


        let azAngle = await gpsBuilder.findAzimuthAngle(startLat, startLon, destLat, destLon);
        let elAngle = await gpsBuilder.findElevationAngle(startLat, startLon, startEl, destLat, destLon, destEl);

        // convert to be usable by pelco-D
        azAngle = azAngle * 100;
        elAngle = elAngle * 100;

        console.log("Az Angle: ", azAngle);
        console.log("El Angle: ", elAngle);

        return(pelcoBuilder.pointTo(azAngle, elAngle));
    }
}

export default GpsService;