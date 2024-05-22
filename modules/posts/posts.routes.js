import express from "express"
import { addPost, deletePost, getPostByAuthor, getPostById, getPosts, updatePost } from "./posts.cotroller.js"




const postsRouter = express.Router()

postsRouter.post('/addPost', addPost)
postsRouter.get('/', getPosts )
postsRouter.get('/:id', getPostById )
postsRouter.put('/:id', updatePost )
postsRouter.delete('/:id', deletePost )
postsRouter.get('/Post/:author', getPostByAuthor )


export default postsRouter