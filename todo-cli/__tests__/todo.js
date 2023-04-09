/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test today",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
    add({
      title: "Test yesterday",
      dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
      completed: false,
    });
    add({
      title: "Test tomorrow",
      dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      completed: false,
    });
  });

  test("Test added new todo command", () => {
    const n = all.length;
    add({
      title: "Test todo add",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
    expect(all.length).toBe(n + 1);
  });

  test("Test marking todo command as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrival of overdue items", () => {
    let a = overdue().length;
    add({
      title: "Test todo overdue",
      dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
      completed: false,
    });
    expect(overdue().length).toBe(a + 1);
  });

  test("Retrival of due today items", () => {
    let b = dueToday().length;
    add({
      title: "Test todo dueToday",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
    expect(dueToday().length).toBe(b + 1);
  });

  test("Retrival of due later items", () => {
    let c = dueLater().length;
    add({
      title: "Test todo dueLater",
      dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      completed: false,
    });
    expect(dueLater().length).toBe(c + 1);
  });
});
