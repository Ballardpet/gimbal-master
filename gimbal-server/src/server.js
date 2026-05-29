// Probably need to set up a .env file
// Maybe a gitignore file too

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import AzElController from "./controllers/azEl.controller.js";
import DisplayController from "./controllers/display.controller.js";
import GpsController from "./controllers/gps.controller.js";
import ManualController from "./controllers/manual.controller.js";
import ADSBController from "./controllers/adsb.controller.js";

import { fileURLToPath } from "url"

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname,"public")));
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 60001; // The "||" means "or". If not port env variable, set it to 60001

app.use("/api/azel", AzElController());
app.use("/api/display", DisplayController());
app.use("/api/gps", GpsController());
app.use("/api/manual", ManualController());
app.use("/api/adsb", ADSBController());

app.listen(port, () => {
    console.log("listening on port " + port);
});