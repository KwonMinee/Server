import express from "express"
import * as authRepository from "../data/auth.mjs"
import * as bcrypt from "bcrypt"
import { config } from "../config.mjs"
import jwt from "jsonwebtoken"




// 회원가입
export async function signup(req, res) {
    // 회원가입 로직 구현
    const { userid, password, name, email } = req.body
    // 예시: 사용자 정보를 데이터베이스에 저장하는 로직
    // await saveUserToDatabase(userid, password, name, email)    
    // 회원 중복 체크
    const found = await authRepository.findByUserid(userid)
    if (found) {
        return res.status(409).json({ message: `${userid} 이미 존재하는 사용자입니다.` })
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds)

    const user = await authRepository.createUser({
        userid, password: hashed, name, email
    })

    const token = await createJwtToken(user.id)
    console.log(token)
    res.status(201).json({ token, user })

    res.status(201).json( user )
}

// 로그인
export async function login(req, res) {
    const { userid, password } = req.body
    const user = await authRepository.findByUserid(userid)
    if (!user) {
        return res.status(401).json({ message: "존재하지 않는 사용자입니다." })
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." })
    }
    const token = await createJwtToken(user.id)
    return res.status(200).json({ token, user })
}

// 로그인 유지 체크
export async function me(req, res) {
    const user = await authRepository.findById(req.id)
    if (!user) {
        return res.status(401).json({ message: "일치하는 사용자를 찾을 수 없습니다." })
    }
    res.status(200).json({ token: req.token, userid: user.userid})
}



async function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec
    })
}