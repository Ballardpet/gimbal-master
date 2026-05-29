import express from "express";
import ManualService from "../services/manual.service.js";

const ManualController = () => {
    const router = express.Router();
    const manualService = new ManualService();

    // Up route
    // Maybe just one route to move
        // Take in direction as a variable and have the service generate appropriate command
    router.post("/manualMove", async (req, res) => {
        const { direction, speed } = req.body;
        try {
            const command = await manualService.manualMove(direction, speed);
            res.status(201).json(command);
        }
        catch (error) {
            res.status(400).json({error: error.message});
        }
    });

    // Stop route
    router.post("/manualStop", async(req, res) => {
        try {
            const command = await manualService.stop();
            res.status(201).json(command);
        }
        catch (error) {
            res.status(400).json({error: error.message});
        }
    });

    return router;
}

export default ManualController;