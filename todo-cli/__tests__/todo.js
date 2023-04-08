const { describe } = require('yargs');
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("TodoList test suite", () => {
  test("should add new todo", () => {
    expect(all.length).toBe(3);
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(4);
  });
  beforeAll(() => {
    const perday = 60 * 60 * 24 * 1000;
    const fday = new Date();
    [
      {
        title: "Buy milk",
        completed: false,
        dueDate: new Date(fday.getTime() - 2 * perday).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "Pay Rent",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Submit Assignment",
        completed: false,
        dueDate: new Date(fday.getTime() + 2 * perday).toLocaleDateString(
          "en-CA"
        ),
      },
    ].forEach(add);
  });

  test("should mark as todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("should retrieve overdue items", () => {
    expect(overdue().length).toEqual(1);
  });
  test("should retrieve due  today items", () => {
    expect(dueToday().length).toEqual(2);
  });
  test("should retrieve due later items", () => {
    expect(dueLater().length).toEqual(1);
  });
});
