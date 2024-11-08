"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class Campaign extends sequelize_1.Model {
}
Campaign.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    code: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    area: { type: sequelize_1.DataTypes.STRING },
    status: { type: sequelize_1.DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, {
    sequelize: config_1.default,
    modelName: 'Campaign',
});
exports.default = Campaign;
