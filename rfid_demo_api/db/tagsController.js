const { DC_tags } = require("./model");

exports.getAll = (req, res) => {
  DC_tags.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the DC Tags.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.bulkCreate = (req, res) => {
  // const values = [
  //   [15, "dsv6989654w", "red31bgt"],
  //   [16, "vewfedf54dw", "pink37tgt"],
  // ];

  const values = req.body;

  DC_tags.bulkCreate(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the Tag.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // register a tag
  const dc_tags = new DC_tags({
    tid: req.body.tid,
    style: req.body.style,
  });

  // Save tag in the database
  DC_tags.create(dc_tags, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the Tag.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  DC_tags.delete(req.params.tid, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the tag.",
      });
    else res.send({ message: "tag deleted ", data });
  });
};
