// const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./db/controller");
const tagsController = require("./db/tagsController");
const ongoingToShopController = require("./db/ongoingToShopController");
const shop1Controller = require("./db/shop1Controller");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.get("/dc_inventory", controller.getAll);
app.get("/dc_inventory/getStock/:style", controller.getStock);
app.post("/dc_inventory/create", controller.create);
app.put("/dc_inventory/update", controller.update);
app.delete("/dc_inventory/delete/:style", controller.delete);

app.get("/dc_tags", tagsController.getAll);
app.post("/dc_tags/create", tagsController.create);
app.delete("/dc_tags/delete/:tid", tagsController.delete);
app.post("/dc_tags/bulkCreate", tagsController.bulkCreate);

app.post("/ongoing_to_shop/bulkCreate", ongoingToShopController.bulkCreate);
app.delete("/ongoing_to_shop/delete/:tid", ongoingToShopController.delete);
app.get("/ongoing_to_shop", ongoingToShopController.getAll);
app.get("/ongoing_to_shop/:shop", ongoingToShopController.getFromShop);
app.delete(
  "/ongoing_to_shop/deleteFromShop/:shop",
  ongoingToShopController.deleteFromShop
);

app.post("/shop1/bulkCreate", shop1Controller.bulkCreate);
app.get("/shop1", shop1Controller.getAll);
app.delete("/shop1/delete/:tid", shop1Controller.delete);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

// module.exports = connection;
