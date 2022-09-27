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
      Update.belongsTo(models.User);
    }
  }
  Update.init(
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Id proyek tidak boleh kosong",
          isEmpty: "Id proyek tidak boleh kosong",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Id user tidak boleh kosong",
          isEmpty: "Id user tidak boleh kosong",
        },
      },
      updateText: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Teks update tidak boleh kosong",
          isEmpty: "Teks update tidak boleh kosong",
        },
      },

      ts: {
        type: DataTypes.DATE,
        validate: {
          isNull: "Timestamp tidak boleh kosong",
          isEmpty: "Timestamp tidak boleh kosong",
        },
      },
    },
    {
      sequelize,
      modelName: "update",
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
