import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import orderModel from './order.model';
import objectModel from './objects.model';

const objectOrderModel = db.define(
   'objectOrder',
   {
      idOrder: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      idObject: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
   },
   {
      timestamps: false
   }
);


objectOrderModel.hasMany(orderModel, { foreignKey: 'id' });
orderModel.belongsToMany(objectModel, { through: objectOrderModel,  foreignKey: 'idOrder', as: 'inventary' });

objectOrderModel.hasMany(objectModel, { foreignKey: 'id' });
objectModel.belongsToMany(orderModel, { through: objectOrderModel,  foreignKey: 'idObject', as: 'order' });

export default objectOrderModel;
