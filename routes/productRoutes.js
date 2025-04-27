const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
