import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';

const vehicleTypeModel = db.define(
   'typeVehicle',
   {
      // idTypeVehicle: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      typeVehicle: {
         type: DataTypes.STRING,
         allowNull: false
      }
   },
   {
      timestamps: false
   }
);

export default vehicleTypeModel;
