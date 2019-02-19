const express = require("express");
const router = express.Router();
const constroller = require("../controller/fabricant.controller");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.get("/", constroller.index());
router.post("/login", constroller.login);
//router.post("/signup", constroller.signUp);
router.delete("/logout", constroller.logout)

module.exports = router;