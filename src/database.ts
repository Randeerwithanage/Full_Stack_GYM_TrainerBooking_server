import * as mongodb from "mongodb";
import { Employee } from "./employee";
import { User } from "./model/user";
import { Trainer } from "./model/trainer";
import { Timeslot} from "./model/timeslot";
 
export const collections: {
   employees?: mongodb.Collection<Employee>;
   users?: mongodb.Collection<User>;
   trainers?: mongodb.Collection<Trainer>;
   timeslots?: mongodb.Collection<Timeslot>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("AppointmentDB");
   await applySchemaValidation(db);
 
   const employeesCollection = db.collection<Employee>("employees");
   const usersCollection = db.collection<User>("users");
   const trainersCollection = db.collection<Trainer>("trainers");
   const timeslotsCollection = db.collection<Timeslot>("timeslots");


   
   collections.employees = employeesCollection;
   collections.users = usersCollection;
   collections.trainers = trainersCollection;
   collections.timeslots = timeslotsCollection;
   
   
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "email" , "password"],
            additionalProperties: false,
            properties: {
                _id: {},

                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is ",
                    
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is ",
                    
                    
                },
            },
        },
    };

       // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
    collMod: "users",
    validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection("users", {validator: jsonSchema}); 
    }
});

};

