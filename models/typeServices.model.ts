import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const typeServiceModel = db.define(
   'typeService',
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      description: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: ''
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

export default typeServiceModel;
