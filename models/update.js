"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Update extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Update.belongsTo(models.Project);
      Update.belongsTo(models.Awardee);
    }
  }
  Update.init(
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Id proyek tidak boleh kosong" },
          notEmpty: { msg: "Id proyek tidak boleh kosong" },
        },
      },
      AwardeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Id user tidak boleh kosong" },
          notEmpty: { msg: "Id user tidak boleh kosong" },
        },
      },
      updateText: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Teks update tidak boleh kosong" },
          notEmpty: { msg: "Teks update tidak boleh kosong" },
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
      modelName: "Update",
      hooks: {
        beforeCreate(instance) {
          instance.ts = new Date();
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return Update;
};
