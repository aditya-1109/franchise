import sequelize from '../config/config';
import User from './user';
import Campaign from './campaign';
import Lead from './lead';

// Associations
Campaign.hasMany(Lead, { foreignKey: 'campaignId' });
Lead.belongsTo(Campaign, { foreignKey: 'campaignId' });

const db = {
  sequelize,
  User,
  Campaign,
  Lead,
};

export default db;
