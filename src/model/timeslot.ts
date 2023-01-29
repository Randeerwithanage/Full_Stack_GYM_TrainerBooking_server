import * as mongodb from "mongodb";

export interface Timeslot{

    trainer_id: string;
    _id: mongodb.ObjectId;
     time:string;
     date:string;

    }





