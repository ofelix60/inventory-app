'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('items', {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('items');
  },
};
