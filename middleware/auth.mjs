import jwt from "jsonwebtoken"
import { config } from "../config.mjs"
import * as authRepository from "../data/auth.mjs"


const AUTH_ERROR = { message: "인증에러" }

export const isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization")
    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("헤더에러")
        return res.status(401).json(AUTH_ERROR)
    }

    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDVmNTQyNGYzZWIyYzA5YWVhZWIzYyIsImlhdCI6MTc4MzAzODAzMSwiZXhwIjoxNzgzMTI0NDMxfQ.6p6donVL5JuJrNBE8B0JkCyP2cpVr4hRb70dcGUKet8

    const token = authHeader.split(" ")[1]
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if(error) {
            console.log("토큰에러")
            return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decoded)
        const user = await authRepository.findById(decoded.id)
        if(!user) {
            console.log("해당 아이디 없음")
            return res.status(401).json(AUTH_ERROR)
        }
        console.log("user.id: ", user.id)
        console.log("user.userid: ", user.userid)
        req.id = user.id
        req.token =token
        next()
    })
}