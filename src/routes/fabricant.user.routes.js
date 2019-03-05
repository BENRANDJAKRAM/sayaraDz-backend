const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/login", authController.login("local-fabricant"));

router.delete("/logout", authController.logout);

module.exports = router;