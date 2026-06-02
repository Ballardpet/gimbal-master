class GpsBuilder {

    async findAzimuthAngle(startLat, startLon, destLat, destLon) {
        // this will be the formula from the youtube video: https://www.youtube.com/watch?v=EiI-Auqp764
        let formulaAngle = Math.atan2((destLon - startLon), (destLat - startLat));
        
        formulaAngle = formulaAngle * (180 / Math.PI); // Convert from radians to degrees

        let azimuthAngle = (180.00 + formulaAngle) % 360; // check about the decimal and if it works how I think.
        return azimuthAngle;
    }

    // honestly this whole thing is kind of a shortcut
        // kind of assumes the earth is flat for how high to point. depending on how far away the target is, it might not matter
    async findElevationAngle(startLat, startLon, startEl, destLat, destLon, destEl){
        // theta = 90 degrees - (tan^-1(altitude difference / haversine formula))
        let elDiff = destEl - startEl; // Aircraft should be above ground
        let haversine = await this.haversine(startLat, startLon, destLat, destLon);
        let theta = Math.atan2(elDiff, haversine);
        theta = theta * (180 / Math.PI); // Convert from radians to degrees
        let elevationAngle = 90 - theta;
        return elevationAngle;
    }

    async haversine(startLat, startLon, destLat, destLon){// assuming elevation is in meters
        // formula for finding distance between two gps coordinates
        let radius = 6371000; // earth radius in meters
        
        // convert to radians for formula
        let lat1Radians = startLat * (Math.PI / 180);
        let lat2Radians = destLat * (Math.PI / 180);
        let lon1Radians = startLon * (Math.PI / 180);
        let lon2Radians = destLon * (Math.PI / 180);

        let latDiff = lat2Radians - lat1Radians;
        let lonDiff = lon2Radians - lon1Radians;

        let innerEquation = Math.pow(Math.sin(latDiff / 2), 2) + Math.pow(Math.sin(lonDiff / 2), 2) * Math.cos(lat1Radians) * Math.cos(lat2Radians);
        let outerEquation = 2 * radius * Math.asin(Math.sqrt(innerEquation));

        return outerEquation;
    }

}

export const gpsBuilder = new GpsBuilder();