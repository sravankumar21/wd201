/* eslint-disable no-undef */

const todoList = require("../todo");

describe("Todo list getting tested", () => {
  let today;

  beforeAll(() => {
    today = new Date().toLocaleDateString("en-CA");
    todoList().add({
      title: "Play a cricket tournament",
      completed: false,
      dueDate: today,
    });
  });

  test("Adding a new todo in the list", () => {
    const { all, add } = todoList();
    const initialLength = all.length;

    add({
      title: "Enroll in a DSA course",
      completed: false,
      dueDate: today,
    });

    expect(all.length).toBe(initialLength + 1);
  });

  test("Marking a todo as completed", () => {
    const { all, markAsComplete } = todoList();
    expect(all[0].completed).toBe(false);

    markAsComplete(0);

    expect(all[0].completed).toBe(true);
  });

  test("Retrieving all overdue todos", () => {
    const { add, overdue } = todoList();

    const initialCount = overdue().length;
    const pastDueTodo = {
      title: "Finish homework",
      completed: false,
      dueDate: new Date("2023-04-01").toLocaleDateString("en-CA"),
    };
    add(pastDueTodo);

    const newCount = overdue().length;

    expect(newCount).toBe(initialCount + 1);

    const overdueTodos = overdue();
    expect(overdueTodos).toContainEqual(pastDueTodo);
  });

  test("Retrieving all todos due today", () => {
    const { add, dueToday } = todoList();

    const initialCount = dueToday().length;
    const todayTodo = {
      title: "Go for a run",
      completed: false,
      dueDate: today,
    };
    add(todayTodo);

    const newCount = dueToday().length;

    expect(newCount).toBe(initialCount + 1);

    const todayTodos = dueToday();
    expect(todayTodos).toContainEqual(todayTodo);
  });

  test("Retrieving all todos due later", () => {
    const { add, dueLater } = todoList();

    const initialCount = dueLater().length;
    const futureTodo = {
      title: "Buy groceries",
      completed: false,
      dueDate: new Date("2023-04-11").toLocaleDateString("en-CA"),
    };
    add(futureTodo);

    const newCount = dueLater().length;

    expect(newCount).toBe(initialCount + 1);

    const laterTodos = dueLater();
    expect(laterTodos).toContainEqual(futureTodo);
  });

  test("Retrieving all todos due for later", () => {
    const { dueLater } = todoList();

    const listOfTodos = dueLater();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
