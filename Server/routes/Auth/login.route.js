
const express = require("express");
const router = express.Router();
const {
    login,
    getMe
} = require("../../controllers/Auth/login");
const authMiddleware = require("../../middlewares/auth.middleware");






router.post("/login", login);
router.get("/me", authMiddleware, getMe);




module.exports = router;
