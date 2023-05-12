/* eslint-disable no-unused-vars */
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static getTodos() {
      return this.findAll();
    }
    /*deletetodo(){
      return this.destroy()
    }*/
    markAsCompleted() {
      return this.update({ completed: true });
    }

    static addTodo(todo) {
      return this.create({
        title: todo.title,
        dueDate: todo.dueDate,
        completed: false,
      });
    }

    static async overdue() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
          completed: false,
        },
      });
    }

    static async duetoday() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
          completed: false,
        },
      });
    }

    static async duelater() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
          completed: false,
        },
      });
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    static completed() {
      return this.findAll({
        where: {
          completed: true,
        },
        order: [["id", "ASC"]],
      });
    }

    setCompletionStatus(bool) {
      return this.update({ completed: bool });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
