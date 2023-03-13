import { DataTypes } from "sequelize";
import { sequelizeConnection } from "../DBConnection.js";


export const productModel=sequelizeConnection.define('product', {
    Pid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    taxes: {
        type: DataTypes.INTEGER
    },
    ads: {
        type: DataTypes.INTEGER
    },
    discount: {
        type: DataTypes.INTEGER
    },
    total:{
        type:DataTypes.INTEGER
    },
    category: {
        type: DataTypes.STRING,
        allowNull:false
    }

})