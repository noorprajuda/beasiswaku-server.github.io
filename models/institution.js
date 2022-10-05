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
      Institution.hasMany(models.Awardee);
      Institution.hasMany(models.Project);
    }
  }
  Institution.init(
    {
      AwardeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Id penerima beasiswa tidak boleh kosong" },
          notEmpty: { msg: "Id penerima beasiswa tidak boleh kosong" },
        },
      },
      institutionName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama institusi tidak boleh kosong" },
          notEmpty: { msg: "Nama institusi tidak boleh kosong" },
        },
      },
      websiteUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "URL website tidak boleh kosong" },
          notEmpty: { msg: "URL website tidak boleh kosong" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Alamat tidak boleh kosong" },
          notEmpty: { msg: "Alamat tidak boleh kosong" },
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
