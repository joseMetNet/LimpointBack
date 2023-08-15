import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Role = db.define(
    'role',
    {
        rol: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
);

export default Role;