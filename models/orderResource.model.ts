import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import orderModel from './order.model';
import ResourceModel from './resource.model';

const orderResourceModel = db.define(
   'orderResource',
   {
      idOrder: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idResource: {
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

orderResourceModel.hasMany(orderModel, { foreignKey: 'id' });
orderModel.belongsToMany(ResourceModel, { through: orderResourceModel,  foreignKey: 'idOrder', as: 'resource' });

orderResourceModel.hasMany(ResourceModel, { foreignKey: 'id' });
ResourceModel.belongsToMany(orderModel, { through: orderResourceModel,  foreignKey: 'idResource', as: 'order' });

export default orderResourceModel;
