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
        validate: {
          isNull: "Nama proyek tidak boleh kosong",
          isEmpty: "Nama proyek tidak boleh kosong",
        },
      },
      AwardeeId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        validate: {
          isNull: "Id user tidak boleh kosong",
          isEmpty: "Id user tidak boleh kosong",
        },
      },
      projectDescription: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Deskripsi proyek tidak boleh kosong",
          isEmpty: "Deskripsi proyek tidak boleh kosong",
        },
      },
      projectLocation: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Lokasi proyek tidak boleh kosong",
          isEmpty: "Lokasi proyek tidak boleh kosong",
        },
      },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          isNull: "Tanggal mulai tidak boleh kosong",
          isEmpty: "Tanggal mulai tidak boleh kosong",
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          isNull: "Tanggal selesai tidak boleh kosong",
          isEmpty: "Tanggal selesai tidak boleh kosong",
        },
      },
      goal: {
        type: DataTypes.BIGINT,
        validate: {
          isNull: "Tujuan tidak boleh kosong",
          isEmpty: "Tujuan tidak boleh kosong",
        },
      },
      pledged: {
        type: DataTypes.BIGINT,
        validate: {
          isNull: "Telah didanai tidak boleh kosong",
          isEmpty: "Telah didanai tidak boleh kosong",
        },
      },
      investors: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: "Jumlah investor tidak boleh kosong",
          isEmpty: "Jumlah investor tidak boleh kosong",
        },
      },
      ProjectStatusId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        validate: {
          isNull: "Id status proyek tidak boleh kosong",
          isEmpty: "Id status proyek tidak boleh kosong",
        },
      },
      InstitutionId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        validate: {
          isNull: "Id institusi tidak boleh kosong",
          isEmpty: "Id institusi tidak boleh kosong",
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        validate: {
          isNull: "Link foto tidak boleh kosong",
          isEmpty: "Link foto tidak boleh kosong",
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
