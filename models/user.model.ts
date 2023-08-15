import { DataTypes } from 'sequelize';
import db from '../database/connection';

const User = db.define(
    'Users',
    {
    // idUser: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     primaryKey: true
    // },
        userName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        idSalePoint: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
);

export default User;