import * as mongodb from "mongodb";

export interface Trainer {
    name: string;
    username: string;
    phoneNumber:string
    email: string;
    password:string;
    rating:number;
    _id?: mongodb.ObjectId;
    gender:string;
    url:string;
}