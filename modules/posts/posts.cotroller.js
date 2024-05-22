import { postModel, userModel } from "../../config/models.js"

// create post
const addPost = async (req, res) => {

    const { title, content, userId } = req.body

    const data = await userModel.findByPk(userId)
    const userName = data.dataValues.userName

    if (data !== null) {
        await postModel.create({
            title: title,
            content: content,
            userId: userId,
            author: userName
        })
        res.status(201).send({ message: `new post for user with id= ${userId} added successfully` })
    } else {
        res.status(401).send({ message: "unauthoried to add post or wrong user Id" })
    }
}

// get all post 
const getPosts = async (req, res) => {
    const posts = await postModel.findAll()

    res.status(200).send({ message: "success", allPosts: posts })
}

// get post by specific id
const getPostById = async (req, res) => {

    const postId = req.params.id


    const post = await postModel.findByPk(postId)

    if (post !== null) {
        res.status(200).send({ message: "success", posts: post })
    } else {
        res.status(404).send({ message: "there is post with that id" })

    }
}
// update post by id
const updatePost = async (req, res) => {
    const postId = req.params.id
    const { title, content } = req.body
    const post = await postModel.findByPk(postId)

    if (post !== null) {
        post.update({
            title: title,
            content: content
        })
        res.status(200).send({ message: "Updated successfully" })
    } else {
        res.status(404).send({ message: "there is post with that id" })

    }
}
// delete post by id
const deletePost = async (req, res) => {
    const postId = req.params.id
    const post = await postModel.findByPk(postId)
    if (post !== null) {
        post.destroy()
        res.status(200).send({ message: "deleted successfully" })
    } else {
        res.status(404).send({ message: "there is post with that id" })

    }

}

// get specific post by author

const getPostByAuthor = async (req, res) => {
    const { author } = req.params
    const postId = Number(req.query.postId)

    if (postId) {
        const posts = await postModel.findAll({ where: { author: author } })
        if (posts !== null) {
            const post = posts.find((post) => post.id === postId)
            if (post !== undefined) {
                res.status(200).send({ message: "success", Post: post })
            }else{
                res.status(404).send({ message: "posts hasn't post with this id" })
            }
        } else {
            res.status(404).send({ message: "this author hasn't any post yet" })
        }

    } else {
        const posts = await postModel.findAll({ where: { author: author } })
        res.status(200).send({ message: "success", Posts: posts })
    }

}


export {
    addPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostByAuthor
}