import { DataTypes } from "sequelize";
import { sequelize } from "./database.js";

const userModel = sequelize.define('user', {
    userName: {
        type: DataTypes.STRING(100)
    },
    email: {
        type: DataTypes.STRING(100)
    },
    password: {
        type: DataTypes.STRING(100)
    }
})

const postModel = sequelize.define('post', {
    title: {
        type: DataTypes.STRING(255),
    },
    content: {
        type: DataTypes.STRING(255),
    },
    author: {
        type: DataTypes.STRING(255),
    }
})

const commentsModel = sequelize.define('comment', {
    content: {
        type: DataTypes.STRING(255),
    }
})

// link between post and users through userId
userModel.hasMany(postModel, {
    foreignKey: 'userId',
});
postModel.belongsTo(userModel);

// link between user and comments throug userId

userModel.hasMany(commentsModel, {
    foreignKey: 'userId',
});
commentsModel.belongsTo(userModel);

// link between posts and comments throug userId

postModel.hasMany(commentsModel, {
    foreignKey: 'postId',
});
commentsModel.belongsTo(postModel);

// to establish and create tables
sequelize.sync()
// to add new column to the exisit table just make sequelize.sync({alter:true}) then remove it 

export{
   userModel,
   postModel,
   commentsModel
}