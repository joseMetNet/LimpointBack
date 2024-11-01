import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const salePointModel = db.define(
   'salePoint',
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      schedule: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: ''
      },
      phone: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: ''
      },
      address: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: ''
      },
      service: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: ''
      },
      email: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: ''
      },
      location: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: ''
      }
   },
   {
      timestamps: false
   }
);

export default salePointModel;
