"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class Lead extends sequelize_1.Model {
}
Lead.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    prospectName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    prospectEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    prospectPhone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    franchiseModel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending', // Status could be 'pending', 'active', 'converted', etc.
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: config_1.default,
    modelName: 'Lead',
    tableName: 'leads', // Ensure that this table matches the one in your database
    timestamps: true,
});
exports.default = Lead;
