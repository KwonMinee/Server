import MongoDB from "mongodb"
import * as UserRepository from "./auth.mjs"
import { getPosts } from "../db/database.mjs"

// 포스트를 작성
export async function create(text, id) {
    return UserRepository.findById(id).then((user) => getPosts().insertOne({
        text,
        createdAt: new Date(),
        idx: user.id,
        name: user.name,
        userid: user.userid
    })).then((result) => {
        return getPosts().findOne({ _id: result.insertedId })
    })
}

// 모든 포스트를 리턴
export async function getAll() {
    return getPosts().find().sort({ createdAt: -1 }).toArray()
}

// 사용자 아이디에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
    return getPosts().find({ userid }).sort({ createdAt: -1 }).toArray()
}