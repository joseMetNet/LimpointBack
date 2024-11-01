import { DataTypes } from 'sequelize';
import db from '../database/connection';
import salePointModel from './salePoint.model';

const User = db.define('Users', {
   userName: {
      type: DataTypes.STRING,
      allowNull: true
   },
   lastName: {
      type: DataTypes.STRING,
      allowNull: true
   },
   phone: {
      type: DataTypes.STRING,
      allowNull: true
   },
   email: {
      type: DataTypes.STRING,
      allowNull: true
   },
   password: {
      type: DataTypes.STRING,
      allowNull: true
   },
   idRol: {
      type: DataTypes.INTEGER,
      allowNull: true
   },
   idSalePoint: {
      type: DataTypes.INTEGER,
      allowNull: true
   }
});

salePointModel.hasMany(User, { foreignKey: 'id' });
User.belongsTo(salePointModel, {
   foreignKey: 'idSalePoint',
   as: 'salePoint'
});

export default User;
