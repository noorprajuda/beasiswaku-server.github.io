"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "E-mail is required" },
          notNull: { msg: "E-mail is required" },
          isEmail: { msg: "Invalid e-mail address!" },
        },
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Amount is required" },
          notNull: { msg: "Amount is required" },
        },
      },
      fee: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Fee is required" },
          notNull: { msg: "Fee is required" },
        },
      },
      OrderId: {
        // allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "OrderId is required" },
          // notNull: { msg: "OrderId is required" },
        },
      },
      // paymentStatus: {
      //   allowNull: false,
      //   type: DataTypes.STRING,
      //   validate: {
      //     notEmpty: { msg: "paymentStatus is required" },
      //     notNull: { msg: "paymentStatus is required" },
      //   },
      // },
    },
    {
      sequelize,
      modelName: "Payment",
      hooks: {
        beforeCreate(instance) {
          if (!instance.name) {
            instance.name = "User";
          }

          instance.OrderId = new Date().getTime();
          instance.paymentStatus = "paid";
        },
      },
    }
  );
  return Payment;
};
