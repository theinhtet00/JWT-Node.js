import { Sequelize } from "sequelize";

const sequelize = new Sequelize("jwtdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("database connection established successfully");
} catch (err) {
  console.log("Unable to connect to database", err);
}

export default sequelize;
