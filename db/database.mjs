import MongoDB from "mongodb"
import { config } from "../config.mjs"

let db

export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host).then((client) => {
        db = client.db("Xdb")
    })
}

//users 컬렉션 객체
export function getUsers(){
    return db.collection("users")
}

export function getPosts(){
    return db.collection("posts")
}