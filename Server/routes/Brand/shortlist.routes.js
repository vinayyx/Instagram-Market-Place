const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");

const {
  addToShortlist,
  getShortlistedCreators,
  removeFromShortlist,
  checkShortlist,
} = require("../../controllers/Brand/shortlist.controller");

// Only logged-in brands can access these APIs
router.use(authMiddleware, allowRoles("brand"));

router.get("/", getShortlistedCreators);
router.get("/check/:creatorId", checkShortlist);
router.post("/:creatorId", addToShortlist);
router.delete("/:creatorId", removeFromShortlist);

module.exports = router;