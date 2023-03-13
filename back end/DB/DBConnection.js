import { Sequelize } from "sequelize";

export const sequelizeConnection = new Sequelize('cruds', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})



export const dbConnection = () => {
    sequelizeConnection.sync({ alter: true, force: false })
        .then(() => { console.log("dbConnection ................."); })
        .catch((error) => console.log({ message: error }))
}