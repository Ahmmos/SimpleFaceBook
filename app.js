import express from 'express'
import cors from "cors"
import userRouter from './modules/users/user.routes.js'
import postsRouter from './modules/posts/posts.routes.js'
import commentsRouter from './modules/comments/comments.routes.js'


const app = express()
const port = process.env.port || 3000
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/posts', postsRouter)
app.use('/posts', commentsRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))