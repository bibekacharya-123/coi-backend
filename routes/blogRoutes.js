const express = require("express");
const upload = require("../config/multer");
const blogController = require("../controllers/blogController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes for admin operations
router.post(
  "/create",
  protect,
  authorize("admin"),
  upload.single("featuredImage"),
  (req, res, next) => {
    blogController.createBlog(req, res).catch(next);
  }
);

// Public routes for viewing blogs
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlog);
router.get("/slug/:slug", blogController.getBlogBySlug);

// Protected routes for admin operations
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("featuredImage"),
  (req, res, next) => {
    blogController.updateBlog(req, res).catch(next);
  }
);

router.delete("/:id", protect, authorize("admin"), blogController.deleteBlog);

module.exports = router;
