import mysql from "mysql2";

export default mysql.createConnection({
  host: <string>process.env.SERVER_DB,
  user: <string>process.env.USER_DB,
  password: <string>process.env.PASSWORD_DB,
  database: <string>process.env.DATABASE_DB
});