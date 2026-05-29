// This should be the arrow keys to manually move & stop the gimbal

// Eventually add a speed slider
    // Maybe like 1-8
    // Pan: 00-3F-FF
        // 256 total options
        // multiply input by 32 and subtract 1 for speed
    // Tilt: 00-3f
        //64 total options
        // multiply input by 8 and subtract 1 for speed

export default function Manual_control(){

    const handleClick = async (direction) => {

        if (direction == "stop") {
            console.log("Gimbal stopped");

            const res = await fetch("/api/manual/manualStop", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    direction: direction
                }),
            });

            const data = await res.json();
            console.log(data);
        }
        else {
            const speed = document.getElementById("speed").value

            console.log("Direction clicked: ", direction, " At speed: ", speed);

            const res = await fetch("/api/manual/manualMove", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    direction: direction,
                    speed: speed
                }),
            });

            const data = await res.json();
            console.log(data);
        }
    }

    
    return (
        /**
         * Want the buttons to have an "onClick" that sends the appropriate command to the back end
         * maybe "onClick={handleClick}"
         * const handleClick = async (e) => {do shit};
         *         Make a json payload (req res) with appropriate command (direction) and speed (maybe)
         */
        <section>
            <h2>Manual Control</h2>
            <div>
                <button type="button" className="control" onClick={() => handleClick("up")}>up</button>
            </div>
            <div>
                <button type="button" className="control" onClick={() => handleClick("left")}>left</button>
                <button type="button" className="control" onClick={() => handleClick("stop")}>stop</button>
                <button type="button" className="control" onClick={() => handleClick("right")}>right</button>
            </div>
            <div>
                <button type="button" className="control" onClick={() => handleClick("down")}>down</button>
            </div>
            <div className="slidecontainer">
                <label htmlFor ="speed">Speed: </label>
                <input type="range" min="1" max="8" className="slider" id="speed" name="speed" />
            </div>
        </section>
    )
}