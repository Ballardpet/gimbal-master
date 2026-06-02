import express from "express";
import { pelcoBuilder } from "../pelcoBuilder.js";

class ManualService {

    async manualMove(direction, speed){
        return (pelcoBuilder.buildMove(direction, speed));
    }

    async stop(){
        return(pelcoBuilder.buildStop());
    }
}

export default ManualService;