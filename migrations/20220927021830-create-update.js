"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Updates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProjectId: {
        foreignKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      AwardeeId: {
        foreignKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updateText: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ts: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Updates");
  },
};
