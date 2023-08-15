import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Vehicle = db.define(
    'Vehicles',
    {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        vehiclePlate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        idTypeVehicle: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        idBrand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        observations: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateRegister: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
    },
);

export default Vehicle;