import MongoDB from "mongodb"
import { getUsers } from "../db/database.mjs"

const ObjectId = MongoDB.ObjectId


export async function findByUserid(userid) {
    return getUsers().find({userid}).next().then(mapOptionalUser)
}


export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => result.insertedId.toString())
}

function mapOptionalUser(user){
    return user ? {...user, id: user._id.toString()}:user
}