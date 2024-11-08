"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("./user"));
const campaign_1 = __importDefault(require("./campaign"));
const lead_1 = __importDefault(require("./lead"));
// Associations
campaign_1.default.hasMany(lead_1.default, { foreignKey: 'campaignId' });
lead_1.default.belongsTo(campaign_1.default, { foreignKey: 'campaignId' });
const db = {
    sequelize: config_1.default,
    User: user_1.default,
    Campaign: campaign_1.default,
    Lead: lead_1.default,
};
exports.default = db;
