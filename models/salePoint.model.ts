import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const salePointModel = db.define(
   'salePoint',
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false
      }
   },
   {
      timestamps: false
   }
);

export default salePointModel;
