
import { useState } from "react";

export default function ADSB(){
    const [target, setTarget] = useState("");

    const handleClick = async() => {
        // This gets triggered on click
        // first thing it does is set loop boolean to true if false and false if true
            // To stop tracking later
        // while(loop)
            // call function to point to target
                // back end points to target
                // back end returns lla
            // lla is returned here
            // set values for lla to be displayed to user
            // wait 1.1 second (to not fuck up API privilege)
            // go back to loop
    }
    
    return (
        <section>
            <h2>Track ADS-B</h2>
            <label htmlFor="target">Enter target hex code: </label>
            <input type="text" id="target" name = "target" value={target} onChange={(e) => setTarget(e.target.value)} />
            <div>Eventually display the target's coordinates here when tracking</div>
            <button type="button" className="automated" onClick={() => handleClick()}>Track Aicraft</button>
        </section>
    )
}