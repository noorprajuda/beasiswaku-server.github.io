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

    const { ProjectDonators } = data;
    ProjectDonators.map((ProjectDonator) => {
      ProjectDonator.createdAt = new Date();
      ProjectDonator.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("ProjectDonators", ProjectDonators, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ProjectDonators", null, {});
  },
};
