"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectStatusHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectStatusHistory.belongsTo(models.ProjectStatus);
      ProjectStatusHistory.belongsTo(models.Project);
    }
  }
  ProjectStatusHistory.init(
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Id proyek tidak boleh kosong" },
          notEmpty: { msg: "Id proyek tidak boleh kosong" },
        },
      },
      ProjectStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Id status proyek tidak boleh kosong" },
          notEmpty: { msg: "Id status proyek tidak boleh kosong" },
        },
      },
      ts: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Timestamp tidak boleh kosong" },
          notEmpty: { msg: "Timestamp tidak boleh kosong" },
        },
      },
    },
    {
      sequelize,
      modelName: "ProjectStatusHistory",
      hooks: {
        beforeCreate(instance) {
          instance.ts = new Date();
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return ProjectStatusHistory;
};
