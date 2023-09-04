import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const objectOrderModel = db.define(
   'objectOrder',
   {
      idOrder: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idObject: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
   },
   {
      timestamps: false
   }
);

export default objectOrderModel;
