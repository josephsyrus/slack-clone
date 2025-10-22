const express = require("express");
// Allow routes to access params from parent routers
const router = express.Router({ mergeParams: true });
const { createChannel } = require("../controllers/channelController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").post(createChannel); // POST /api/workspaces/:workspaceId/channels

module.exports = router;
