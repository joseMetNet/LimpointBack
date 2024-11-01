import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const clientModel = db.define(
   'client',
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      lastname: {
         type: DataTypes.STRING,
         allowNull: false
      },
      phone: {
         type: DataTypes.STRING,
         allowNull: false
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: DataTypes.NOW
      }
   },
   {
      timestamps: false
   }
);

export default clientModel;
