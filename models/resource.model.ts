import { DataTypes, Sequelize } from "sequelize";
import db from "../database/connection";
import orderServiceModel from './order.model';
import orderResourceModel from './orderResource.model';

const ResourceModel = db.define(
  "resource",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);


// ResourceModel.belongsToMany(orderServiceModel, { through: orderResourceModel });


export default ResourceModel;
