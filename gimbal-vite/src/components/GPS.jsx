import { useState, useRef, useEffect } from "react";

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

    // P5
    const [p5Aircraft, setP5Aircraft] = useState([]);

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

    const handleP5 = async () => {
        // This should be super close to handleADSB
        // Will eventually need some sort of check to deconflict adsb and p5: when one starts, it makes sure to stop the other if running
        // Lets start by displaying aircraft!
    }

    // update display
    const loadP5Aircraft = async () => {
        try {
            const res = await fetch("/api/gps/p5Aircraft");
            const data = await res.json();

            // Convert object into array
            setP5Aircraft(Object.values(data));
        }
        catch (err) {
            console.error(err);
        }
    }

    // update display
    useEffect(() => {
        loadP5Aircraft();

        const interval = setInterval(loadP5Aircraft, 1000);

        return () => clearInterval(interval);
    }, []);
    
    
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

            <br />

            <h2>Track P5</h2>
            <div>Put a list of aircraft here</div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Callsign</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Altitude (m)</th>
                    </tr>
                </thead>

                <tbody>
                    {p5Aircraft.map((aircraft) => (
                        <tr key={aircraft.callsign}>
                            <td>{aircraft.callsign}</td>
                            <td>{aircraft.lat}</td>
                            <td>{aircraft.lon}</td>
                            <td>{aircraft.alt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>Maybe just click on an aircraft to select it??</div>
            <div>For now, maybe just display a list and have the user enter a callsign. So it's just like ADSB tracking</div>
            <div>Have a "track" button here. Should track the selected aircraft. Also, this onClick and the one for ADS-B should be linked. If the other is on when you press it, it should be turned off</div>

        </section>
    )   
}