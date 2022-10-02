"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProjectDonators", {
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
      DonatorId: {
        foreignKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      donationAmount: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("ProjectDonators");
  },
};
