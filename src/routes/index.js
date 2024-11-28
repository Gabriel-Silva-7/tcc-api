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
const getBlockPerCondominiumController = require("../controllers/getBlockPerCondominium");
const getApartmentPerBlockController = require("../controllers/getApartmentPerBlock");
const getUserPerAddressController = require("../controllers/getUserPerAddress");
const createHelpController = require("../controllers/createHelp");
const verifyUserAdminController = require("../controllers/verifyUserAdmin");
const getLockerPerCondominiumController = require("../controllers/getLockerPerCondominium");
const createMoradorController = require("../controllers/createMorador");
const getMyResidentsController = require("../controllers/getMyResidents");
const updateResidentController = require("../controllers/updateResident");

const loginUser = require("../controllers/login");
const authenticateJWT = require("../middleware");

router.get("/", (req, res) => {
  res.status(200).send({ helloWolrd: "helloWolrd!" });
});
router.post("/createuser", createUser);
router.post("/createHelp", createHelpController);
router.post("/verifyuser", verifyUserExistController);
router.post("/userDetails", authenticateJWT, getUserDetailsController);
router.post("/updateUser", authenticateJWT, updateUserController);
router.post("/verifycpf", verifyCpfExistController);
router.post("/verifyLocker", authenticateJWT, verifyLockerStatusController);
router.post("/updateLocker", updateLockerStatusController);
router.post("/getBlock", getBlockPerCondominiumController);
router.post("/getApartment", getApartmentPerBlockController);
router.post("/getUserPerAddress", getUserPerAddressController);
router.post("/createLockerHistory", createLockerHistoryController);
router.post("/updateLockerHistory", updateLockerHistoryController);
router.post("/verifyUserAdmin", authenticateJWT, verifyUserAdminController);
router.post("/getMyResidents", authenticateJWT, getMyResidentsController);
router.post("/updateResident", authenticateJWT, updateResidentController);
router.post(
  "/getLockerPerCondominium",
  authenticateJWT,
  getLockerPerCondominiumController
);
router.post("/createMorador", authenticateJWT, createMoradorController);
router.post("/getLockerHistory", authenticateJWT, getHistoryLockerController);
router.post(
  "/getLastLockerHistory",
  authenticateJWT,
  getLastHistoryLockerController
);
router.post("/getLockerNotBusy", getLockerNotBusyController);
router.post("/login", loginUser);
module.exports = router;
