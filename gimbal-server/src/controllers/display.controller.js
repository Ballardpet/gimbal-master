import express from "express";
import DisplayService from "../services/display.service.js";

const DisplayController = () => {
    const router = express.Router();
    const displayService = new DisplayService();

    // This will eventually update the front end with real-time az/el of the gimbal

    router.get("/getAzEl", async (req,res) => {
        //console.log("made it to controller");
        try {
            const az = await displayService.getAz();
            const el = await displayService.getEl();

            // MAYBE do polling or real-time socket updates eventually.
                // It looks like the gimbal can still point to a gps coordinate while I send queries for az/el
                // This means I probably can constantly ask for position while tracking
                // with constant data I could probably make a little graphic

            res.status(200).json({
                azimuth: az,
                elevation: el
            });
        }
        catch (error) {
            res.status(400).json({error: error.message});
        }
    });
    return router;
}

export default DisplayController;