"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectStatus.hasMany(models.Project);
      ProjectStatus.hasMany(models.ProjectStatusHistory);
    }
  }
  ProjectStatus.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Status tidak boleh kosong" },
          notEmpty: { msg: "Status tidak boleh kosong" },
        },
      },
    },
    {
      sequelize,
      modelName: "ProjectStatus",
      hooks: {
        beforeCreate(instance) {
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return ProjectStatus;
};
