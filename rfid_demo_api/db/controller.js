const { DC_inventory, DC_inventory_update } = require("./model");

exports.getAll = (req, res) => {
  DC_inventory.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving the DC Inventory.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getAllStock = (req, res) => {
  DC_inventory.getAllStock((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all stock.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getStockByStyles = (req, res) => {
  styles = [req.body];

  // styles = [["DREREDXS1", "JEABLUL1", "SHIBLAM2"]];

  DC_inventory.getStockByStyles(styles, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving stock by styles.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getByStyle = (req, res) => {
  DC_inventory.getByStyle(req.params.style, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving products by style.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a style
  const dc_inventory = new DC_inventory({
    style: req.body.style,
    stock: req.body.stock,
    name: req.body.name,
    colour: req.body.colour,
    sz: req.body.sz,
    price: req.body.price,
  });

  // Save style in the database
  DC_inventory.create(dc_inventory, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Style.",
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const style = new DC_inventory_update({
    stock: req.body.stock,
    style: req.body.style,
  });

  DC_inventory_update.updateStock(style, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Style with id ${style.style}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Style with id " + style.style,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  DC_inventory.delete(req.params.style, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the style.",
      });
    else res.send({ message: "style deleted ", data });
  });
};

exports.getStock = (req, res) => {
  DC_inventory.getStock(req.params.style, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the Stock.",
      });
    } else {
      res.send(data);
    }
  });
};
