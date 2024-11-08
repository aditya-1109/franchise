import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config';

class Lead extends Model {
  id!: number;
  prospectName!: string;
  prospectEmail!: string;
  prospectPhone!: string;
  area!: string;
  franchiseModel!: string;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prospectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prospectEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    prospectPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    franchiseModel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',  // Status could be 'pending', 'active', 'converted', etc.
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Lead',
    tableName: 'leads',  // Ensure that this table matches the one in your database
    timestamps: true,
  }
);

export default Lead;
