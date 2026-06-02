// This will allow the user to input azimuth and elevation to point the gimbal towards
import { useState } from "react";

export default function Az_el(){

    const [azimuth, setAzimuth] = useState("");
    const [elevation, setElevation] = useState("");
    
    const handleClick = async() => {

        console.log(azimuth, elevation)

        // send info to back end
        const res = await fetch("/api/azel/azElPoint", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                azimuth: azimuth,
                elevation: elevation
            }),
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <section>
            <h2>Point to Azimuth/Elevation</h2>
            <label htmlFor="azimuth">Destination Azimuth,0 to 360.00: </label>
            <input type="text" id="azimuth" name = "azimuth" value={azimuth} onChange={(e) => setAzimuth(e.target.value)} />
            <br />
            <label htmlFor ="elevation">Destination Elevation, -90.00 to 90.00: </label>
            <input type="text" id="elevation" name="elevation" value={elevation} onChange={(e) => setElevation(e.target.value)}/>
            <br />
            <button type="button" className="automated" onClick={() => handleClick()}>Point to az/el</button>
        </section>
    )
}