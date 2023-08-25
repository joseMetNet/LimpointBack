import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const paymentModel = db.define(
   'pay',
   {
      typePay: {
         type: DataTypes.STRING,
         allowNull: false
      }
   },
   {
      timestamps: false
   }
);

export default paymentModel;
