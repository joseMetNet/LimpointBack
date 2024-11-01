import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const brandVehicleModel = db.define(
   'brands',
   {
      brand: {
         type: DataTypes.STRING,
         allowNull: false
      }
   },
   {
      timestamps: false
   }
);

export default brandVehicleModel;
