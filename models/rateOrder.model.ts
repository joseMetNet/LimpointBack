import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import orderModel from './order.model';

const RateModel = db.define(
   'rate',
   {
      idTypeRate: {
         type: DataTypes.INTEGER,
         allowNull: true
      },
      observation: {
         type: DataTypes.STRING,
         allowNull: true
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



export default RateModel;
