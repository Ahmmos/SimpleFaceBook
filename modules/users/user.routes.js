

import express from "express"
import { login, logout, signUp, userPosts } from "./user.controller.js"
import { checkEmail } from "../../midddleWare/middleWare.js"


const userRouter = express.Router()

userRouter.post('/signup', checkEmail, signUp)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.get('/:id', userPosts)



export default userRouter