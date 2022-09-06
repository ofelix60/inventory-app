'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.items);
      this.hasMany(models.users);
    }
  }
  inventory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'inventory',
      modelName: 'inventory',
    }
  );
  return inventory;
};
