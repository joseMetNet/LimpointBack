import { DataTypes } from 'sequelize';
import db from '../database/connection';
import clientModel from './client.model';
import vehicleTypeModel from './vehicleType.model';
import brandVehicleModel from './brandVehicle.model';
import agreementModel from './agreement.model';

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

vehicleTypeModel.hasMany(Vehicle, { foreignKey: 'id' });
Vehicle.belongsTo(vehicleTypeModel, {
   foreignKey: 'idTypeVehicle',
   as: 'typeVehicle'
});

brandVehicleModel.hasMany(Vehicle, { foreignKey: 'id' });
Vehicle.belongsTo(brandVehicleModel, {
   foreignKey: 'idBrand',
   as: 'brand'
});

agreementModel.hasMany(Vehicle, { foreignKey: 'id' });
Vehicle.belongsTo(agreementModel, {
   foreignKey: 'idAgreement',
   as: 'agreement'
});



export default Vehicle;
