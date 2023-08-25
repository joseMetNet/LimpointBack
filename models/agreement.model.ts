import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const agreementModel = db.define(
   'agreement',
   {
      agreement: {
         type: DataTypes.STRING,
         allowNull: false
      },
      numberAble: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
   },
   {
      timestamps: false
   }
);

export default agreementModel;

