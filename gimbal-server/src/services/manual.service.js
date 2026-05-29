import express from "express";
import { pelcoBuilder } from "../pelcoBuilder.js";

class ManualService {
    // This is where manual control will happen
    // const pelcoBuilder = new PelcoBuilder();

    async manualMove(direction, speed){
        // generate command to send to the gimbal
            // speed and direction
            // Make a helper function to create Pelco-D messages (or just do it all here)
        // In other project I would send to prisma here, what do I do with this?
            // Do I make a master file with some basic Pelco command creators? How would I do this?
                // Put it in src as a file I think
            // Once the command is created, do I send it to the gimbal from here or from the other file? Here, right?
        // Return the command
        
        return (pelcoBuilder.buildMove(direction, speed));
    }

    // Stop
    async stop(){
        // Generate a command to send to the gimbal
        // Return the command
        return(pelcoBuilder.buildStop());
    }
}

export default ManualService;