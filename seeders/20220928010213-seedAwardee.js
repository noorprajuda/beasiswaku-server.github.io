"use strict";

const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");

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

    const { Awardees } = data;
    Awardees.map((Awardee) => {
      Awardee.createdAt = new Date();
      Awardee.updatedAt = new Date();
      Awardee.password = hashPassword(Awardee.password);
    });

    await queryInterface.bulkInsert("Awardees", Awardees, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Awardees", null, {});
  },
};
