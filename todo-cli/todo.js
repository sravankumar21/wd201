const todoList = () => {
  let all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter(
      (x) =>
        x.dueDate === new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    );
  };

  const dueToday = () => {
    return all.filter(
      (x) => x.dueDate === new Date().toISOString().slice(0, 10)
    );
  };

  const dueLater = () => {
    return all.filter(
      (x) =>
        x.dueDate === new Date(Date.now() + 86400000).toISOString().slice(0, 10)
    );
  };

  const toDisplayableList = (list) => {
    let l = list
      .map(
        (x) =>
          `${x.completed ? "[x]" : "[ ]"} ${x.title.trim()} ${
            x.dueDate == new Date().toISOString().split("T")[0]
              ? ""
              : x.dueDate.trim()
          }`
      )
      .join("\n");
    return l;
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
