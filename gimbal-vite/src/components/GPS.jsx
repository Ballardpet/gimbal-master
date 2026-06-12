import { useState, useRef } from "react";

export default function GPS(){

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    // GPS point
    // default to easy calibration coordinates (point at window)
    const [startLat, setStartLat] = useState(30.48805497184136 );
    const [startLon, setStartLon] = useState(-86.4974440391438);
    const [startEl, setStartEl] = useState(0);
    const [destLat, setDestLat] = useState(30.488513065621497 );
    const [destLon, setDestLon] = useState(-86.49811890303361);
    const [destEl, setDestEl] = useState(1);

    // ADSB stuff
    const [target, setTarget] = useState("");

    const [isTracking, setIsTracking] = useState(false);
    const loopRef = useRef(false);

    const [targetLat, setTargetLat] = useState(0);
    const [targetLon, setTargetLon] = useState(0);
    const [targetEl, setTargetEl] = useState(0);

    const [cameraPoint, setCameraPoint] = useState(false);

    const handleClick = async() => {
        console.log("Put a relevant GPS message here");

        const res = await fetch("/api/gps/gpsPoint", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startLat: startLat,
                startLon: startLon,
                startEl: startEl,
                destLat: destLat,
                destLon: destLon,
                destEl: destEl, 
                cameraPoint: cameraPoint
            }),
        });
        const data = await res.json();
        console.log(data);
    }

    const handleADSB = async() => {
        // toggles start/stop
        // loopRef.current = !loopRef.current;
        const newState = !loopRef.current;
        loopRef.current = newState;
        setIsTracking(newState);

        // maybe make an indicator when we start/stop

        while (loopRef.current){
            // call ADSBPoint
                // should return target LLA
            
            try {
                const res = await fetch("/api/gps/adsb", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        startLat: startLat,
                        startLon: startLon,
                        startEl: startEl,
                        targetHexID: target, 
                        cameraPoint: cameraPoint
                    }),
                });
                const data = await res.json();
                setTargetLat(data.lat);
                setTargetLon(data.lon);
                setTargetEl(data.el);
            }
            catch (err) {
                console.error(err);
            }
            // Call api every second
            await sleep (1000);
        }
    }
    
    
    return (
        <section>
            <h2>Point to GPS Coordinate. Using DD </h2>


            <label><input type="checkbox" checked={cameraPoint} onChange={(e) => setCameraPoint(e.target.checked)}/>Camera Point: Adjust "level" to be flat or forward</label>
            
            <br />
            
            <label htmlFor="currentLat">Current Latitude: </label>
            <input type="text" id="currentLat" name="currentLat" value={startLat} onChange={(e) => setStartLat(e.target.value)}/>
            <label htmlFor="currentLong">Current Longitude: </label>
            <input type="text" id="currentLong" name="currentLong" value={startLon} onChange={(e) => setStartLon(e.target.value)}/>
            <label htmlFor="currentEl">Current Elevation: </label>
            <input type="text" id="currentEl" name="currentEl" value={startEl} onChange={(e) => setStartEl(e.target.value)}/>

            <br />

            <label htmlFor="destinationLat">Destination Latitude: </label>
            <input type="text" id="destinationLat" name="destinationLat" value={destLat} onChange={(e) => setDestLat(e.target.value)}/>
            <label htmlFor="destinationLong">Destination Longitude: </label>
            <input type="text" id="destinationLong" name="destinationLong" value={destLon} onChange={(e) => setDestLon(e.target.value)}/>
            <label htmlFor="destinationEl">Destination Elevation: </label>
            <input type="text" id="destinationEl" name="destinationEl" value={destEl} onChange={(e) => setDestEl(e.target.value)}/>
            <br />
            <button type="button" className="automated" onClick={() => handleClick()}>Point to coordinates</button>

            <br />

            <h2>Track ADS-B</h2>
            <label htmlFor="target">Enter target hex code: </label>
            <input type="text" id="target" name = "target" value={target} onChange={(e) => setTarget(e.target.value)} />
            <div>Target Latitude: {targetLat} Target Longitue: {targetLon} Target Elevation: {targetEl}</div>
            <button type="button" className="automated" onClick={() => handleADSB()} style={{backgroundColor: isTracking ? "red" : "green",color: "white"}}>{isTracking ? "Stop Tracking" : "Start Tracking"}</button>

        </section>
    )
}