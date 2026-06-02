import express from "express";
import DisplayService from "../services/display.service.js";

const DisplayController = () => {
    const router = express.Router();
    const displayService = new DisplayService();

    router.get("/getAzEl", async (req,res) => {
        try {
            const az = await displayService.getAz();
            const el = await displayService.getEl();

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