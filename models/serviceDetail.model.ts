import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import typeServiceModel from './typeServices.model';

const serviceDetailModel = db.define(
   'serviceDetail',
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      idTypeVehicle: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idTypeService: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      cost: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: DataTypes.NOW
      },
      description: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: ''
      }
   },
   {
      timestamps: false
   }
);


typeServiceModel.hasMany(serviceDetailModel, { foreignKey: 'id' });
serviceDetailModel.belongsTo(typeServiceModel, {
   foreignKey: 'idTypeService',
   as: 'service'
});

export default serviceDetailModel;
