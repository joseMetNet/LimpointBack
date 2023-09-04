import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const orderDetailServiceModel = db.define(
   'orderDetailService',
   {
      idOrder: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idDetailService: {
         type: DataTypes.INTEGER,
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

export default orderDetailServiceModel;
