
import { pelcoBuilder } from "../pelcoBuilder.js";

// THIS FILE IS OBSOLETE!!!

// this will probably be where I connect to the API
    // can eventually make my own api once I have a receiver
        // this depends on whether or not my final tracking source will be adsb or another format

class ADSBService {
    // first step is to convert gps service into a gpsbuilder
        // done!
    async pointTo (startLat, startLon, startEl, hexID){
        // Honestly I really don't Think I need this
            // It makes more sense to do everything on the gps controller, service, and front end

    } 
}

export default ADSBService;