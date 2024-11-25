const createUser = require("../controllers/createUser/index");
const express = require("express");
const router = express.Router();
const verifyCpfExistController = require("../controllers/verifyCpfExist");
const verifyUserExistController = require("../controllers/verifyUserExist");
const getUserDetailsController = require("../controllers/getUserDetails");
const updateUserController = require("../controllers/updateUser");
const verifyLockerStatusController = require("../controllers/verifyLockerStatus");
const updateLockerStatusController = require("../controllers/updateLockerStatus");
const createLockerHistoryController = require("../controllers/createHistoryLocker");
const updateLockerHistoryController = require("../controllers/updateHistoryLocker");
const getHistoryLockerController = require("../controllers/getHistoryLocker");
const getLastHistoryLockerController = require("../controllers/getLastHistoryLocker");
const getLockerNotBusyController = require("../controllers/getLockerNotBusy");

const loginUser = require("../controllers/login");
const authenticateJWT = require("../middleware");

router.get("/", (req, res) => {
  res.status(200).send({ helloWolrd: "helloWolrd!" });
});
router.post("/createuser", createUser);
router.post("/verifyuser", verifyUserExistController);
router.post("/userDetails", authenticateJWT, getUserDetailsController);
router.post("/updateUser", authenticateJWT, updateUserController);
router.post("/verifycpf", verifyCpfExistController);
router.post("/verifyLocker", authenticateJWT, verifyLockerStatusController);
router.post("/updateLocker", authenticateJWT, updateLockerStatusController);
router.post(
  "/createLockerHistory",
  authenticateJWT,
  createLockerHistoryController
);
router.post(
  "/updateLockerHistory",
  authenticateJWT,
  updateLockerHistoryController
);
router.post("/getLockerHistory", authenticateJWT, getHistoryLockerController);
router.post(
  "/getLastLockerHistory",
  authenticateJWT,
  getLastHistoryLockerController
);
router.post("/getLockerNotBusy", getLockerNotBusyController);
router.post("/login", loginUser);
module.exports = router;
