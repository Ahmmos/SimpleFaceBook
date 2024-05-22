import { commentsModel, postModel, userModel } from "../../config/models.js";

//add comment
const addComment = async (req, res) => {
    console.log(req.params)
    const { content, userId } = req.body

    const postId = req.params.id

    const post = await postModel.findByPk(postId)

    if (post !== null) {
        await commentsModel.create({
            content: content,
            postId: postId,
            userId: userId
        })
        res.status(201).send({ message: `new comment added for post with id= ${postId}` })
    } else {
        res.status(401).send({ message: "there is no post with that id" })
    }
}
//get comments of specific post
const getCommentsOfPost = async (req, res) => {

    const postId = req.params.id

    const post = await postModel.findByPk(postId)

    if (post !== null) {
        const comments = await commentsModel.findAll({ where: { postId: postId } })
        if (comments.length !== 0) {
            res.status(200).send({ message: "success", Allcomments: comments })
        } else {
            res.status(404).send({ message: "This post hasn't any comments" })
        }
    } else {
        res.status(404).send({ message: "there is post with that id" })
    }
}

//update comment

const UpdateComment = async (req, res) => {

    const postId = req.params.id
    const commentId = Number(req.query.commentId)

    const post = await postModel.findByPk(postId)

    if (post !== null) {
        const comments = await commentsModel.findAll({ where: { postId: postId } })
        if (comments.length !== 0) {
            const commentToUpdate = comments.find((comment) => comment.dataValues.id === commentId)
            if (commentToUpdate == undefined) {
                res.status(404).send({ message: "there is no comment with that id" })
            } else {
                commentToUpdate.update({
                    content: req.body.content
                })
                res.status(200).send({ message: "updated successfully" })
            }
        } else {
            res.status(404).send({ message: "there is no comment with that id" })
        }
    } else {
        res.status(404).send({ message: "there is post with that id" })
    }
}

//remove comment
const removeComment = async (req, res) => {
    const postId = req.params.id
    const commentId = Number(req.query.commentId)

    const post = await postModel.findByPk(postId)

    if (post !== null) {
        const comments = await commentsModel.findAll({ where: { postId: postId } })
        if (comments.length !== 0) {
            const commentToDelete = comments.find((comment) => comment.dataValues.id === commentId)
            if (commentToDelete == undefined) {
                res.status(404).send({ message: "there is no comment with that id" })
            } else {
                commentToDelete.destroy()
                res.status(200).send({ message: "Deleted successfully" })
            }
        } else {
            res.status(404).send({ message: "there is no comment with that id" })
        }
    } else {
        res.status(404).send({ message: "there is post with that id" })
    }

}


export {
    addComment,
    getCommentsOfPost,
    UpdateComment,
    removeComment
}
