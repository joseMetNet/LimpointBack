import { DataTypes } from 'sequelize';
import db from '../database/connection';
import clientModel from './client.model';

const Vehicle = db.define('Vehicles', {
   idClient: {
      type: DataTypes.INTEGER,
      allowNull: true
   },
   plate: {
      type: DataTypes.STRING,
      allowNull: true
   },
   idTypeVehicle: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   idBrand: {
      type: DataTypes.STRING,
      allowNull: true
   },
   idAgreement: {
      type: DataTypes.INTEGER,
      allowNull: true
   },
   observations: {
      type: DataTypes.STRING,
      allowNull: true
   },
   dateRegister: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
   }
});

clientModel.hasMany(Vehicle, { foreignKey: 'id' });

Vehicle.belongsTo(clientModel, {
   foreignKey: 'idClient',
   as: 'client'
});

export default Vehicle;
