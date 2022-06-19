'use strict';
require('dotenv').config();
const foodModel = require('./food.model');
const ingredientsModel = require('./Ingredients');
const Collection = require('./collection');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user.model');


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const foodTable = foodModel(sequelize, DataTypes);
const ingredientsTable =  ingredientsModel(sequelize, DataTypes);
const userTable = UserModel(sequelize, DataTypes);



const foodCollection = new Collection(foodTable);
const ingredientsCollection = new Collection(ingredientsTable);

module.exports = {
    db: sequelize,
    food:foodCollection,
    ingredients:ingredientsCollection,
    Users: userTable,
};