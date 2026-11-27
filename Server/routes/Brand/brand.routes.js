
const express = require("express");
const router = express.Router();
const {
    registerBrand
} = require("../../controllers/Brand/brand.controller");




router.post("/register", registerBrand);



module.exports = router;
