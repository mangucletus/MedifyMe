const express = require("express");
const router = express.Router();
const patients = require("../controllers/patients");
const catchAsync = require("../utils/catchAsync");

router.route("/login").post(catchAsync(patients.login));
router.route("/register").post(catchAsync(patients.register));
router
  .route("/health_history")
  .get(patients.healthHistory)
  .post(patients.healthHistoryForm);

router.route("/visits").get(patients.visits);

module.exports = router;