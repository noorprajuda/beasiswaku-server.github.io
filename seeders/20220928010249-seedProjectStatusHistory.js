"use strict";

const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const data = require("../data/beasiswaku.json");

    const { ProjectStatusHistories } = data;
    ProjectStatusHistories.map((ProjectStatusHistories) => {
      ProjectStatusHistories.createdAt = new Date();
      ProjectStatusHistories.updatedAt = new Date();
    });

    await queryInterface.bulkInsert(
      "ProjectStatusHistories",
      ProjectStatusHistories,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ProjectStatusHistories", null, {});
  },
};
