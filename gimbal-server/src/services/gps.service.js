import { pelcoBuilder } from "../pelcoBuilder.js";
import { gpsBuilder } from "../gpsBuilder.js";

class GpsService {

    async adsb(startLat, startLon, startEl, targetHexID){
        // Get data from dump1090
        const url= "http://localhost:8080/data/aircraft.json";
        
        try {
            // get json of all planes nearby
            const response = await fetch(url);
            const data = await response.json();

            // find the aircraft with matching hexid
            const target = data.aircraft.find(plane => plane.hex === targetHexID.toLowerCase());

            // use relevant aircraft info to get target LLA
            let targetLat = target.lat;
            let targetLon = target.lon;
            let targetEl = target.altitude; // I'm assuming this is barometric (above sea level), but I'll have to double check

            // Reject invalid values
            if (![targetLat, targetLon, targetEl].every(Number.isFinite)) {
                return null;
            }

            // convert elevation from feet to meters
            targetEl = targetEl * 0.3048;
            // can call pointTo using start and target LLA
            this.pointTo(startLat, startLon, startEl, targetLat, targetLon, targetEl)

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

        // calibrate to point gimbal south for better gulf testing
        azAngle = azAngle + 180;
        if (azAngle > 360) {
            azAngle = azAngle - 360;
        }

        // convert to be usable by pelco-D
        azAngle = azAngle * 100;
        elAngle = elAngle * 100;

        console.log("Az Angle: ", azAngle);
        console.log("El Angle: ", elAngle);

        return(pelcoBuilder.pointTo(azAngle, elAngle));
    }
}

export default GpsService;