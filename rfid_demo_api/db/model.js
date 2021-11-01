// const sql = require("../index");
// const mysqlClient = require("mysql");
// const dotenv = require("dotenv");
// dotenv.config();

// Create a connection to the database
// const connection = mysqlClient.createConnection({
//   host: "localhost",
//   user: "admin",
//   password: "adminA1@",
//   database: "rfid_demo",
//   port: "3306",
// });

// open the MySQL connection
// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

// module.exports = connection;

const connection = require("./connection");

const DC_inventory = function (dc_inventory) {
  this.style = dc_inventory.style;
  this.stock = dc_inventory.stock;
  this.name = dc_inventory.name;
  this.colour = dc_inventory.colour;
  this.sz = dc_inventory.sz;
  this.price = dc_inventory.price;
};

const DC_tags = function (dc_tags) {
  this.tid = dc_tags.tid;
  this.style = dc_tags.style;
  this.name = dc_tags.name;
  this.colour = dc_tags.colour;
  this.sz = dc_tags.sz;
  this.price = dc_tags.price;
};

const DC_inventory_update = function (dc_inventory) {
  this.stock = dc_inventory.stock;
  this.style = dc_inventory.style;
};

const OngoingToShop = function (ongoingToShop) {
  this.shop = ongoingToShop.shop;
  this.tid = ongoingToShop.tid;
  this.style = ongoingToShop.style;
  this.name = ongoingToShop.name;
  this.colour = ongoingToShop.colour;
  this.sz = ongoingToShop.sz;
  this.price = ongoingToShop.price;
};

DC_inventory.getAll = (result) => {
  connection.query("SELECT * FROM dc_inventory", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("dc_inventory: ", res);
    result(null, res);
  });
};

DC_inventory.getStock = (style, result) => {
  connection.query(
    "SELECT stock FROM dc_inventory WHERE style = ?",
    style,
    (err, res) => {
      if (err) {
        console.log("error: ", error);
        result(null, err);
        return;
      }

      console.log("stock: ", res);
      result(null, res);
    }
  );
};

DC_inventory.create = (data, result) => {
  connection.query("INSERT INTO dc_inventory SET ?", data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log({ id: res.insertId, ...data });
    console.log("New Style created");
    result(null, { id: res.insertId, ...data });
  });
};

DC_inventory_update.updateStock = (style, result) => {
  connection.query(
    "UPDATE dc_inventory SET stock = ? WHERE style = ?",
    [style.stock, style.style],
    (err, res) => {
      if (err) {
        console.log(err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "NOT FOUND" }, null);
        return;
      }

      console.log("updated style: ", { ...style });
      result(null, { ...style });
    }
  );
};

DC_tags.bulkCreate = (values, result) => {
  connection.query(
    "INSERT INTO dc_tags (id, tid, style, name, colour, sz, price) VALUES ?",
    [values],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log({ id: res.insertId, ...values });
      console.log("Tids registered");
      result(null, { id: res.insertId, ...values });
    }
  );
};

DC_inventory.delete = (style, result) => {
  connection.query(
    "DELETE FROM dc_inventory WHERE style = ?",
    style,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // style not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted style: ", style);
      result(null, res);
    }
  );
};

DC_tags.getAll = (result) => {
  connection.query("SELECT * FROM dc_tags", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("dc_tags: ", res);
    result(null, res);
  });
};

DC_tags.create = (data, result) => {
  connection.query("INSERT INTO dc_tags SET ?", data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log({ id: res.insertId, ...data });
    result(null, { id: res.insertId, ...data });
  });
};

DC_tags.delete = (tid, result) => {
  connection.query("DELETE FROM dc_tags WHERE tid = ?", tid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // tid not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tid: ", tid);
    result(null, res);
  });
};

OngoingToShop.getAll = (result) => {
  connection.query("SELECT * FROM ongoing_to_shop", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ongoing_to_shop: ", res);
    result(null, res);
  });
};

OngoingToShop.bulkCreate = (values, result) => {
  connection.query(
    "INSERT INTO ongoing_to_shop (shop, tid, style, name, colour, sz, price) VALUES ?",
    [values],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log({ id: res.insertId, ...values });
      console.log("Tids registered to Ongoing to Shop");
      result(null, { id: res.insertId, ...values });
    }
  );
};

OngoingToShop.delete = (tid, result) => {
  connection.query(
    "DELETE FROM ongoing_to_shop WHERE tid = ?",
    tid,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // tid not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted tid: ", tid);
      result(null, res);
    }
  );
};

module.exports = {
  DC_inventory,
  DC_inventory_update,
  DC_tags,
  OngoingToShop,
};
