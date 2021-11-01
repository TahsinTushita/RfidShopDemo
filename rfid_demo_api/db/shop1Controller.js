const { Shop1 } = require("./model");

exports.bulkCreate = (req, res) => {
  const values = req.body;

  Shop1.bulkCreate(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the Tags.",
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Shop1.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the Shop1 Tags.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  Shop1.delete(req.params.tid, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the tag.",
      });
    else res.send({ message: "tag deleted ", data });
  });
};
