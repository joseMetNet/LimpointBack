import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import Vehicle from './vehicle.model';
import clientModel from './client.model';
import orderResourceModel from './orderResource.model';

const orderServiceModel = db.define(
   'orderService',
   {
      idVehicle: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idPay: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idStatusOrderService: {
         type: DataTypes.INTEGER,
         allowNull: true,
         defaultValue: 1
      },
      idSalePoint: {
         type: DataTypes.INTEGER,
         allowNull: true
      },
      totalCost: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      observations: {
         type: DataTypes.STRING,
         allowNull: true
      },
      otherObject: {
         type: DataTypes.STRING,
         allowNull: true
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: DataTypes.NOW
      },
      updatedAt: {
         type: DataTypes.DATE,
         allowNull: true
      },
      dateEnd: {
         type: DataTypes.DATE,
         allowNull: true
      },
      idClient: {
         type: DataTypes.INTEGER,
         allowNull: true
      }
   },
   {
      timestamps: false
   }
);

Vehicle.hasMany(orderServiceModel, { foreignKey: 'id' });

orderServiceModel.belongsTo(Vehicle, {
   foreignKey: 'idVehicle',
   as: 'vehicle'
});

clientModel.hasMany(orderServiceModel, { foreignKey: 'id' });

orderServiceModel.belongsTo(clientModel, {
   foreignKey: 'idClient',
   as: 'client'
});

// orderServiceModel.belongsToMany(orderServiceModel, { through: orderResourceModel });

export default orderServiceModel;
