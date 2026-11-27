
const express = require("express");
const router = express.Router();
const {
    getAllCreator,
    getCreatorById
} = require("../../controllers/Brand/creatorForBrand.controller");

const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");




router.get("/all", authMiddleware, allowRoles("brand"), getAllCreator);
router.get("/:id", authMiddleware, allowRoles("brand"), getCreatorById);




module.exports = router;
