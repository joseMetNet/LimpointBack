import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import orderServiceModel from './order.model';
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

orderResourceModel.hasMany(orderServiceModel, { foreignKey: 'id' });
orderServiceModel.belongsToMany(ResourceModel, { through: orderResourceModel,  foreignKey: 'idOrder', as: 'resource' });

orderResourceModel.hasMany(ResourceModel, { foreignKey: 'id' });
ResourceModel.belongsToMany(orderServiceModel, { through: orderResourceModel,  foreignKey: 'idResource', as: 'order' });

export default orderResourceModel;
