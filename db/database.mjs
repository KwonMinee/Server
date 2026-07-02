import MongoDB from "mongodb"
import { config } from "../config.mjs"

let db

export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host).then((client) => {
        db = client.db("Xdb")
    })
}