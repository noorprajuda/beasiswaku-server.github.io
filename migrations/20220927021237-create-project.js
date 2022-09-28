"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      UserId: {
        foreignKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      projectDescription: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      projectLocation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      goal: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      pledged: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      investors: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ProjectStatusId: {
        foreignKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      InstitutionId: {
        foreignKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      imageUrl: {
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
    await queryInterface.dropTable("Projects");
  },
};
