import express from "express";
import ADSBService from "../services/adsb.service.js";

// THIS FILE IS OBSOLETE!!!

const ADSBController = () => {
    const router = express.Router();
    const asdbService = new ADSBService(); // Is this right?

    router.post("/adsbTrack", async (req, res) => {
        const { hexID } = req.body;
        try {
            //
            const response = await asdbService.track(hexID);
            res.status(201).json(response)
        } catch (error) {
            res.status(400).json({error: error.message});
        };
    })

    return router;
}

export default ADSBController;