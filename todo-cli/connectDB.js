const Sequelize = require("sequelize");

const db = "todo_db";
const username = "postgres";
const password = "DB@123";
const sequelize = new Sequelize(db, username, password, {
  host: "localhost",
  dialect: "postgres",
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

const connect = async () => {
  return sequelize.authenticate();
};

module.exports = {
  connect,
  sequelize,
};
