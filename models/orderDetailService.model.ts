import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import orderModel from './order.model';
import serviceDetailModel from './serviceDetail.model';

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


orderDetailServiceModel.hasMany(orderModel, { foreignKey: 'id' });
orderModel.belongsToMany(serviceDetailModel, { through: orderDetailServiceModel,  foreignKey: 'idOrder', as: 'typeWash' });

orderDetailServiceModel.hasMany(serviceDetailModel, { foreignKey: 'id' });
serviceDetailModel.belongsToMany(orderModel, { through: orderDetailServiceModel,  foreignKey: 'idDetailService', as: 'order' });

export default orderDetailServiceModel;
