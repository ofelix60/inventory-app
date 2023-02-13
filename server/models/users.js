'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    // uncomment method to hide id
    toJSON() {
      return { ...this.get(), id: undefined };
    }
    static associate(models) {
      // define association here
      this.belongsToMany(models.items, {
        through: {
          model: 'inventory',
          unique: false,
        },
        constraints: false,
      });
    }
  }
  users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'users',
    }
  );
  return users;
};
