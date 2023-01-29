import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";

export const timeslotRouter = express.Router();
timeslotRouter.use(express.json());

timeslotRouter.get("/", async (_req, res) => {
    try {
        const timeslots = await collections.timeslots.find({}).toArray();
        res.status(200).send(timeslots);
    } catch (error) {
        res.status(500).send(error.message);
}
});