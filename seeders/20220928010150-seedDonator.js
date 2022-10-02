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

    const { Donators } = data;
    Donators.map((Donator) => {
      Donator.createdAt = new Date();
      Donator.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Donators", Donators, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Donators", null, {});
  },
};
