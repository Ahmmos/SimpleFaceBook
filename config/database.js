import { Sequelize } from "sequelize";



// start DB connection
export const sequelize = new Sequelize("mysql://uicpddnhdhfjyjjg:u9OZsIJr5wJarDJcQyiK@bei7alyfuypojxceukr4-mysql.services.clever-cloud.com:3306/bei7alyfuypojxceukr4");

//test the connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:');
}