/* eslint-disable no-undef */
// models/todo.js
"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const OverdueList = await Todo.overdue();
      const overdueitems = OverdueList.map((todo) => todo.displayableString());
      console.log(overdueitems.join("\n").trim());
      console.log("\n");

      console.log("Due Today");
      const duetodaylist = await Todo.dueToday();
      const duetodayitems = duetodaylist.map((todo) =>
        todo.displayableString()
      );
      console.log(duetodayitems.join("\n").trim());

      console.log("\n");

      console.log("Due Later");
      const duelaterlist = await Todo.overdue();
      const duelateritems = duelaterlist.map((todo) =>
        todo.displayableString()
      );
      console.log(duelateritems.join("\n").trim());
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      return await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const day = new Date(this.dueDate);
      return day.getDate() === new Date().getDate()
        ? `${this.id}. ${checkbox} ${this.title}`.trim()
        : `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`.trim();
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
