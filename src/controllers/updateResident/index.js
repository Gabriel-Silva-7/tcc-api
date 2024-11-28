const updateResident = require("../../services/updateResident");

const updateResidentController = async (req, res) => {
  try {
    const body = req.body;

    const update = await updateResident(body);

    res.status(201).send({
      message: "Resident updated successfully",
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error updating locker history",
      error: error.message,
    });
  }
};

module.exports = updateResidentController;
