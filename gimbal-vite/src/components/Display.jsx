// Display the orientation of the gimbal and show movement eventually (big maybe on a graphic)
import { useState, useEffect } from "react";

// MAYBE MAKE AN INDICATOR TO DISPLAY IF YOU ARE CONNECTED TO THE GIMBAL OR NOT!!!

export default function Display(){
    const [azimuth, setAzimuth] = useState(0);
    const [elevation, setElevation] = useState(0);

    // function to fetch data
    const fetchAzEl = async () => {
        try {
            const res = await fetch("/api/display/getAzEl");

            if (!res.ok) {
                throw new Error("Failed to fetch");
            }

            const data = await res.json();

            setAzimuth(data.azimuth);
            setElevation(data.elevation);

            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // fetch immediately on mount
        fetchAzEl();

        // then fetch repeatedly
        const interval = setInterval(() => {
            fetchAzEl();
        }, 1000); // every 1 second

        // cleanup when component unmounts
        return () => clearInterval(interval);
    }, []);


    return (
        <section>
            <h2>Gimbal Orientation</h2>
            <div>Current Azimuth: {azimuth}</div>
            <div>Current Elevation: {elevation}</div>
        </section>
    )
}