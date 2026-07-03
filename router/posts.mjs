import express from "express"
import { isAuth } from "../middleware/auth.mjs"
import * as postController from "../controller/posts.mjs"

const router = express.Router()

//전체 포스트 가져오기
//http://127.0.0.1:8080/post (GET)

router.get("/", isAuth,postController.getPosts)

//글 번호에 대한 포스트만 가져오기
// http://127.0.0.1:8080/post/:id (GET)
router.get("/:id", isAuth, postController.getPost)


//포스트 쓰기
//http://127.0.01:8080/post
router.post("/",isAuth,postController.createPost)

//포스트 수정하기




//포스트 삭제하기
// http://127.0.0.1:8080/post/:id (DELETE)
router.delete("/:id", isAuth, postController.deletePost)


export default router