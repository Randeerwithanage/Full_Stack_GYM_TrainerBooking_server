import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";

export const trainerRouter = express.Router();
trainerRouter.use(express.json());

trainerRouter.get("/", async (_req, res) => {
    try {
        const trainers = await collections.users.find({}).toArray();
        res.status(200).send(trainers);
    } catch (error) {
        res.status(500).send(error.message);
}
});