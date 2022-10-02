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
        validate: {
          isNull: "Nama depan tidak boleh kosong",
          isEmpty: "Nama depan tidak boleh kosong",
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Nama belakang tidak boleh kosong",
          isEmpty: "Nama belakang tidak boleh kosong",
        },
      },
      userName: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Username tidak boleh kosong",
          isEmpty: "Username tidak boleh kosong",
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isNull: "E-mail tidak boleh kosong",
          isEmpty: "E-mail tidak boleh kosong",
          isEmail: { attributes: true, msg: "E-mail tidak valid" },
        },
        unique: {
          args: true,
          msg: "E-mail sudah dipakai!",
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Kata sandi tidak boleh kosong",
          isEmpty: "Kata sandi tidak boleh kosong",
        },
      },
      studyMotivation: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Motivasi belajar tidak boleh kosong",
          isEmpty: "Motivasi belajar tidak boleh kosong",
        },
      },
      InstitutionId: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Id proyek tidak boleh kosong",
          isEmpty: "Id proyek tidak boleh kosong",
        },
      },
      idNumber: {
        type: DataTypes.STRING,
        validate: {
          isNull: "KTP tidak boleh kosong",
          isEmpty: "KTP tidak boleh kosong",
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
