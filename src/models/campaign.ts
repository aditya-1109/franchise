import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/config';

interface CampaignAttributes {
  id: number;
  name: string;
  code: string;
  area: string;
  status: 'active' | 'inactive';  // Only two allowed values
}

interface CampaignCreationAttributes extends Optional<CampaignAttributes, 'id'> {}

class Campaign extends Model<CampaignAttributes, CampaignCreationAttributes> implements CampaignAttributes {
  public id!: number;
  public name!: string;
  public code!: string;
  public area!: string;
  public status!: 'active' | 'inactive';
}

Campaign.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    area: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
  },
  {
    sequelize,
    modelName: 'Campaign',
  }
);

export default Campaign;
