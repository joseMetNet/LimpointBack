import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const statusOrderModel = db.define(
   'statusOrder',
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

export default statusOrderModel;
