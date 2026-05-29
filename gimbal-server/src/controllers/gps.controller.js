import express from "express";
import GpsService from "../services/gps.service.js";

// Finding azimuth by coordinates: https://www.youtube.com/watch?v=EiI-Auqp764
    // I think we do the theata AB formula, use the gimbal as B, and use the result as the theta
    // Maybe use the haversin formula for distance to point, combine that with elevation difference for height, and use the two for elevation angle

const GpsController = () => {
    const router = express.Router();
    const gpsService = new GpsService();

    router.post("/gpsPoint", async (req, res) => {
        const { startLat, startLon, startEl, destLat, destLon, destEl } = req.body;
        try {
            const command = await gpsService.pointTo(startLat, startLon, startEl, destLat, destLon, destEl);
            res.status(201).json(command);
        }
        catch (error) {
            res.status(400).json({error: error.message});
        }
    });

    router.post("/adsb", async (req, res) => {
        const { startLat, startLon, startEl, targetHexID } = req.body;
        try {
            const response = await gpsService.adsb(startLat, startLon, startEl, targetHexID)
            res.status(201).json(response)
        }
        catch (error) {
            res.status(400).json({error: error.message});
        }
    })

    return router;
}

export default GpsController;