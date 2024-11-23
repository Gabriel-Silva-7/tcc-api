const createUser = require("../controllers/createUser/index");
const express = require("express");
const router = express.Router();
const verifyCpfExistController = require("../controllers/verifyCpfExist");
const verifyUserExistController = require("../controllers/verifyUserExist");
const verifyLockerStatusController = require("../controllers/verifyLockerStatus");
const updateLockerStatusController = require("../controllers/updateLockerStatus");

router.get("/", (req, res) => {
  res.status(200).send({ helloWolrd: "helloWolrd!" });
});
router.post("/createuser", createUser);
router.post("/verifyuser", verifyUserExistController);
router.post("/verifycpf", verifyCpfExistController);
router.post("/verifyLocker", verifyLockerStatusController);
router.post("/updateLocker", updateLockerStatusController);
module.exports = router;
