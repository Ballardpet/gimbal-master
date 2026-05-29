import express from "express";
import AzElService from "../services/azEl.service.js";

const AzElController = () => {
    const router = express.Router();
    const azElService = new AzElService();

    router.post("/azElPoint", async (req, res) => {
        const { azimuth, elevation } = req.body;
        try {
            const command = await azElService.pointTo(azimuth, elevation);
            res.status(201).json(command);
        }
        catch (error) {
            res.status(400).json({error: error.message});
        }
    });

    return router;
}

export default AzElController;