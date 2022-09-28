"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Institution.init(
    {
      institutionName: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Nama institusi tidak boleh kosong",
          isEmpty: "Nama institusi tidak boleh kosong",
        },
      },
      websiteURL: {
        type: DataTypes.STRING,
        validate: {
          isNull: "URL website tidak boleh kosong",
          isEmpty: "URL website tidak boleh kosong",
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Alamat tidak boleh kosong",
          isEmpty: "Alamat tidak boleh kosong",
        },
      },
    },
    {
      sequelize,
      modelName: "Institution",
      hooks: {
        beforeCreate(instance) {
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return Institution;
};