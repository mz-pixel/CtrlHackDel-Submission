// backend/db.js
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_mysql_username",
  password: "your_mysql_password",
  database: "form_data",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

export default connection;
