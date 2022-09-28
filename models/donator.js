"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project);
      User.hasMany(models.Update);
    }
  }
  Donator.init(
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
      projectsSupported: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Project supported tidak boleh kosong",
          isEmpty: "Project supported tidak boleh kosong",
        },
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Jumlah total tidak boleh kosong",
          isEmpty: "Jumlah total tidak boleh kosong",
        },
      },
      idNumber: {
        type: Sequelize.INTEGER,
        validate: {
          isNull: "KTP tidak boleh kosong",
          isEmpty: "KTP tidak boleh kosong",
        },
      },
    },
    {
      sequelize,
      modelName: "Donator",
      hooks: {
        beforeCreate(instance) {
          instance.password = bcrypt.hashSync(instance.password, 10);
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return Donator;
};