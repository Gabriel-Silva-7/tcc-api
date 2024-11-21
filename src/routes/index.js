const createUser = require("../controllers/createUser/index");
const express = require("express");
const router = express.Router();
const verifyCpfExistController = require("../controllers/verifyCpfExist");
const verifyUserExistController = require("../controllers/verifyUserExist");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});
router.post("/createuser", createUser);
router.post("/verifyuser", verifyUserExistController);
router.post("/verifyCpf", verifyCpfExistController);

module.exports = router;
