
import bcrypt from 'bcrypt'
import { commentsModel, postModel, userModel } from '../../config/models.js'


// signUp 

const signUp = async (req, res) => {


    const { userName, email, password } = req.body

    await userModel.create({
        userName: userName,
        email: email,
        password: password
    })
    res.status(201).send({ message: "new user added successfully" })
}

// // signin 

const login = async (req, res) => {
    const data = await userModel.findOne({ where: { email: req.body.email }, attributes: ['id', 'email', 'password'] })

    if (data !== null) {
        const isMatch = bcrypt.compareSync(req.body.password, data.password)
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid username or Password" })
        } else {
            res.status(200).send({ message: "logged in successfully", userId: data.id })
        }
    } else {
        res.status(401).send({ message: "Invalid email or Password" })
    }

}

const logout = (req, res) => {
    // front end should manage this by remove userId from local storage 
    res.status(200).send({ message: "logged out successfully" })
}


// Special endpoint to get a specific user with a specific post and post’s comments.

const userPosts = async (req, res) => {
    const postId = Number(req.query.postId)
    const userId = req.params.id

    const user = await userModel.findByPk(userId)
    if(user == null ){
        return res.status(404).send({ message: "user not found" })
    }

    if (postId) {
        const post = await postModel.findByPk(postId)
        if (post !== null){
            const postComments = await commentsModel.findAll({ where: {  postId: postId}})
            if(postComments.length !==0){
                res.status(200).send({ message: "success", userPost: post, Comments: postComments })
            }else{
                res.status(404).send({ message: "this post has no comments"})
            }
        }else{
            res.status(404).send({ message: "post not found" })
        }

    } else {
        const posts = await postModel.findAll({ where: { userId: userId } })
        if(posts !== null){
            res.status(200).send({ message: "success", userPosts: posts })
        } else {
            res.status(404).send({ message: "user not found" })
        }

    }
}



export {
    signUp,
    login,
    logout,
    userPosts
}