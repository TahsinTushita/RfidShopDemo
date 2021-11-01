const mysqlClient = require("mysql");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const connection = mysqlClient.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
