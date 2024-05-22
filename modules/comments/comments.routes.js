import express from "express"
import { UpdateComment, addComment, getCommentsOfPost, removeComment } from "./comments.controller.js"




const commentsRouter = express.Router()

commentsRouter.post('/:id/newComment', addComment)
commentsRouter.get('/:id/comments', getCommentsOfPost)
commentsRouter.put('/:id/comments', UpdateComment)
commentsRouter.delete('/:id/comments', removeComment)


export default commentsRouter