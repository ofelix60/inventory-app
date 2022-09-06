'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.users, {
        through: {
          model: 'inventory',
          unique: false,
        },
        constraints: false,
      });
    }
  }
  items.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      itemType: {
        type: DataTypes.STRING,
      },
      itemDesc: {
        type: DataTypes.TEXT,
      },
      rarity: {
        type: DataTypes.STRING,
      },
      requiresAttunement: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.STRING,
      },
      damageDice: {
        type: DataTypes.STRING,
      },
      damageType: {
        type: DataTypes.STRING,
      },
      itemWeight: {
        type: DataTypes.STRING,
      },
      properties: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      tableName: 'items',
      modelName: 'items',
    }
  );
  return items;
};
