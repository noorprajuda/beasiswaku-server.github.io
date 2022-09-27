"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectDonator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectDonator.init(
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Id proyek tidak boleh kosong",
          isEmpty: "Id proyek tidak boleh kosong",
        },
      },
      DonatorId: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Id donatur tidak boleh kosong",
          isEmpty: "Id donatur tidak boleh kosong",
        },
      },
      donationAmount: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Jumlah donasi tidak boleh kosong",
          isEmpty: "Jumlah donasi tidak boleh kosong",
        },
      },
    },
    {
      sequelize,
      modelName: "ProjectDonator",
      hooks: {
        beforeCreate(instance) {
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return ProjectDonator;
};
