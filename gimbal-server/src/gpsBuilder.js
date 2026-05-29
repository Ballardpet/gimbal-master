// shouldn't need imports

class GpsBuilder {
    // shouldn't need to track variables

    // shouldn't need a constructor

    async findAzimuthAngle(startLat, startLon, destLat, destLon) {
        // I think we do the theata AB formula, use the gimbal as B, and use the result as the theta
            // NOPE! DRAWING WAS WEIRD! Theta AB where gimbal is a
        // this will be the formula from the youtube video
            // angle = tan^-1((destx - gimbalx)/(desty - gimbaly))
            // azimuth angle = 180 + angle
        // let formulaAngle = Math.atan((destLon - startLon)/(destLat - startLat)); // This was original but it may get messed up in other quadrants
        let formulaAngle = Math.atan2((destLon - startLon), (destLat - startLat));
        
        formulaAngle = formulaAngle * (180 / Math.PI); // Convert from radians to degrees

        // console.log("formua angle", formulaAngle);

        let azimuthAngle = (180.00 + formulaAngle) % 360; // check about the decimal and if it works how I think.
        return azimuthAngle;
    }

    // honestly this whole thing is kind of a shortcut
        // cobbleing together spherical triogonometry with my original cartesian idea
        // probably find something more legit
            // Nope! we're pointing at drones, not planes, so the earth is flat and my math is fine
                // ACTUALLY I might be pointing at stuff further away, so I may need to be more accurate
    async findElevationAngle(startLat, startLon, startEl, destLat, destLon, destEl){
        // theta = 90 degrees - (tan^-1(altitude difference / haversine formula))
        let elDiff = destEl - startEl; // Drone should be above ground
        let haversine = await this.haversine(startLat, startLon, destLat, destLon);
        // let theta = Math.atan(elDiff / haversine); // Original but may get messed up in other quadrants
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