"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Awardee);
      Project.belongsTo(models.ProjectStatus);
      Project.hasMany(models.ProjectStatusHistory);
      Project.hasMany(models.Update);
      Project.belongsTo(models.Institution);
      Project.hasMany(models.ProjectDonator);
    }
  }
  Project.init(
    {
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama proyek tidak boleh kosong" },
          notEmpty: { msg: "Nama proyek tidak boleh kosong" },
        },
      },
      AwardeeId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Id user tidak boleh kosong" },
          notEmpty: { msg: "Id user tidak boleh kosong" },
        },
      },
      projectDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Deskripsi proyek tidak boleh kosong" },
          notEmpty: { msg: "Deskripsi proyek tidak boleh kosong" },
        },
      },
      projectLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Lokasi proyek tidak boleh kosong" },
          notEmpty: { msg: "Lokasi proyek tidak boleh kosong" },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Tanggal mulai tidak boleh kosong" },
          notEmpty: { msg: "Tanggal mulai tidak boleh kosong" },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { mssg: "Tanggal selesai tidak boleh kosong" },
          notEmpty: { mssg: "Tanggal selesai tidak boleh kosong" },
        },
      },
      goal: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notNull: { msg: "Tujuan tidak boleh kosong" },
          notEmpty: { msg: "Tujuan tidak boleh kosong" },
        },
      },
      pledged: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notNull: { msg: "Telah didanai tidak boleh kosong" },
          notEmpty: { msg: "Telah didanai tidak boleh kosong" },
        },
      },
      investors: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Jumlah investor tidak boleh kosong" },
          notEmpty: { msg: "Jumlah investor tidak boleh kosong" },
        },
      },
      ProjectStatusId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Id status proyek tidak boleh kosong" },
          notEmpty: { msg: "Id status proyek tidak boleh kosong" },
        },
      },
      InstitutionId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Id institusi tidak boleh kosong" },
          notEmpty: { msg: "Id institusi tidak boleh kosong" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Link foto tidak boleh kosong" },
          notEmpty: { msg: "Link foto tidak boleh kosong" },
        },
      },
    },
    {
      sequelize,
      modelName: "Project",
      hooks: {
        beforeCreate(instance) {
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return Project;
};
