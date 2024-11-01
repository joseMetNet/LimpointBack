import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const objectModel = db.define(
   'object',
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

export default objectModel;
