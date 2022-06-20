'use strict';
const foodModel = (sequelize, DataTypes) => 
sequelize.define('food', {
    name: {
        type: DataTypes.STRING,
        required: true
    },

    type: {
        type: DataTypes.STRING,
        required: true
    },
    Notes: {
        type: DataTypes.STRING,
        required: false
    }
});

module.exports = foodModel;