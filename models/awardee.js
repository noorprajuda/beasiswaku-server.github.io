"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Awardee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Awardee.hasOne(models.Project);
      Awardee.hasMany(models.Update);
      Awardee.belongsTo(models.Institution);
    }
  }
  Awardee.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama depan tidak boleh kosong" },
          notEmpty: { msg: "Nama depan tidak boleh kosong" },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama belakang tidak boleh kosong" },
          notEmpty: { msg: "Nama belakang tidak boleh kosong" },
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Username tidak boleh kosong" },
          notEmpty: { msg: "Username tidak boleh kosong" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "E-mail tidak boleh kosong" },
          notEmpty: { msg: "E-mail tidak boleh kosong" },
          isEmail: { attributes: true, msg: "E-mail tidak valid" },
        },
        unique: {
          args: true,
          msg: "E-mail sudah dipakai!",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Kata sandi tidak boleh kosong" },
          notEmpty: { msg: "Kata sandi tidak boleh kosong" },
        },
      },
      studyMotivation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Motivasi belajar tidak boleh kosong" },
          notEmpty: { msg: "Motivasi belajar tidak boleh kosong" },
        },
      },
      InstitutionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Id proyek tidak boleh kosong" },
          notEmpty: { msg: "Id proyek tidak boleh kosong" },
        },
      },
      idNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "KTP tidak boleh kosong" },
          notEmpty: { msg: "KTP tidak boleh kosong" },
        },
      },
    },
    {
      sequelize,
      modelName: "Awardee",
      hooks: {
        beforeCreate(instance) {
          instance.password = hashPassword(instance.password);
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return Awardee;
};
