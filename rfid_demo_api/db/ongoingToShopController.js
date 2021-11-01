const { OngoingToShop } = require("./model");

exports.getAll = (req, res) => {
  OngoingToShop.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving the list.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.bulkCreate = (req, res) => {
  const values = req.body;

  OngoingToShop.bulkCreate(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the Tags.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  OngoingToShop.delete(req.params.tid, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the tag.",
      });
    else res.send({ message: "tag deleted ", data });
  });
};
