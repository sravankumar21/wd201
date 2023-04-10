const todoList = () => {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    if (index >= 0 && index < all.length && !all[index].completed) {
      all[index].completed = true;
    }
  };

  const overdue = () => {
    const today = new Date().toLocaleDateString("en-CA");
    return all.filter((todo) => {
      return todo.dueDate < today && !todo.completed;
    });
  };

  const dueToday = () => {
    const today = new Date().toLocaleDateString("en-CA");
    return all.filter((todo) => {
      return todo.dueDate === today && !todo.completed;
    });
  };

  const dueLater = () => {
    const today = new Date().toLocaleDateString("en-CA");
    return all.filter((todo) => {
      return todo.dueDate > today && !todo.completed;
    });
  };

  const toDisplayableList = (list) => {
    const today = new Date().toLocaleDateString("en-CA");
    return list
      .map((todo) => {
        const display_status = todo.completed ? "[x]" : "[ ]";
        const display_date = todo.dueDate === today ? "" : ` (${todo.dueDate})`;

        return `${display_status} ${todo.title}${display_date}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
