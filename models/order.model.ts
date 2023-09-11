import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import Vehicle from './vehicle.model';
import clientModel from './client.model';
import orderResourceModel from './orderResource.model';
import statusOrderModel from './statusOrder.model';
import salePointModel from './salePoint.model';
import RateModel from './rateOrder.model';

const orderModel = db.define(
   'order',
   {
      idVehicle: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idPay: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idStatusOrder: {
         type: DataTypes.INTEGER,
         allowNull: true,
         defaultValue: 1
      },
      idSalePoint: {
         type: DataTypes.INTEGER,
         allowNull: true
      },
      idRate: {
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

Vehicle.hasMany(orderModel, { foreignKey: 'id' });

orderModel.belongsTo(Vehicle, {
   foreignKey: 'idVehicle',
   as: 'vehicle'
});

clientModel.hasMany(orderModel, { foreignKey: 'id' });

orderModel.belongsTo(clientModel, {
   foreignKey: 'idClient',
   as: 'client'
});

statusOrderModel.hasMany(orderModel, { foreignKey: 'id' });
orderModel.belongsTo(statusOrderModel, {
   foreignKey: 'idStatusOrder',
   as: 'status'
});


salePointModel.hasMany(orderModel, { foreignKey: 'id' });
orderModel.belongsTo(salePointModel, {
   foreignKey: 'idSalePoint',
   as: 'salePoint'
});

RateModel.hasMany(orderModel, { foreignKey: 'id' });
orderModel.belongsTo(RateModel, {
   foreignKey: 'idRate',
   as: 'rate'
});

export default orderModel;
