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
      ProjectDonator.belongsTo(models.Project);
      ProjectDonator.belongsTo(models.Donator);
    }
  }
  ProjectDonator.init(
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Id proyek tidak boleh kosong" },
          notEmpty: { msg: "Id proyek tidak boleh kosong" },
        },
      },
      DonatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Id donatur tidak boleh kosong" },
          notEmpty: { msg: "Id donatur tidak boleh kosong" },
        },
      },
      donationAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Jumlah donasi tidak boleh kosong" },
          notEmpty: { msg: "Jumlah donasi tidak boleh kosong" },
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
