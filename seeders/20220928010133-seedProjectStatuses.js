"use strict";

const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */

    // Calling the readFileSync() method
    // to read 'input.txt' file
    const data = require("../data/beasiswaku.json");

    const { ProjectStatuses } = data;
    ProjectStatuses.map((ProjectStatus) => {
      ProjectStatus.createdAt = new Date();
      ProjectStatus.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("ProjectStatuses", ProjectStatuses, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("ProjectStatuses", null, {});
  },
};
