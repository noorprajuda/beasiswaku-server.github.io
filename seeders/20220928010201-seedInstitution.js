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

    const { Institutions } = data;
    Institutions.map((Institution) => {
      Institution.createdAt = new Date();
      Institution.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Institutions", Institutions, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Institutions", null, {});
  },
};
