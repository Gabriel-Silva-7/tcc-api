const createUser = require("../controllers/createUser/index");
const express = require("express");
const router = express.Router();
const verifyCpfExistController = require("../controllers/verifyCpfExist");
const verifyUserExistController = require("../controllers/verifyUserExist");
const verifyLockerStatusController = require("../controllers/verifyLockerStatus");
const updateLockerStatusController = require("../controllers/updateLockerStatus");
const loginUser = require("../controllers/login");
const authenticateJWT = require("../middleware");

router.get("/", (req, res) => {
  res.status(200).send({ helloWolrd: "helloWolrd!" });
});
router.post("/createuser", createUser);
router.post("/verifyuser", verifyUserExistController);
router.post("/verifycpf", verifyCpfExistController);
router.post("/verifyLocker", authenticateJWT, verifyLockerStatusController);
router.post("/updateLocker", authenticateJWT, updateLockerStatusController);
router.post("/login", loginUser);
module.exports = router;
