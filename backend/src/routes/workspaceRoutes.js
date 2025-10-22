const express = require("express");
const router = express.Router();
const {
  getWorkspaces,
  createWorkspace,
  joinWorkspace,
  renameWorkspace,
  deleteWorkspace,
  getWorkspaceData,
} = require("../controllers/workspaceController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router
  .route("/")
  .get(getWorkspaces) // GET /api/workspaces
  .post(createWorkspace); // POST /api/workspaces

router.post("/join", joinWorkspace); // POST /api/workspaces/join

router
  .route("/:workspaceId")
  .get(getWorkspaceData) // GET /api/workspaces/:workspaceId
  .put(renameWorkspace) // PUT /api/workspaces/:workspaceId
  .delete(deleteWorkspace); // DELETE /api/workspaces/:workspaceId

module.exports = router;
