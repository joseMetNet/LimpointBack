import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/connection';
import ResourceModel from './resource.model';

const TypeRateModel = db.define(
   'typeRate',
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      idResource: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
   },
   {
      timestamps: false
   }
);

ResourceModel.hasMany(TypeRateModel, { foreignKey: 'id' });
TypeRateModel.belongsTo(ResourceModel, {
   foreignKey: 'idResource',
   as: 'resource'
});

export default TypeRateModel;
