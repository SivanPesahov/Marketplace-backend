const express = require("express");

const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
} = require("../controllers/product.controller");

const router = express.Router();
router.get("/", getProducts);
router.post("/create", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.patch("/edit/:id", editProduct);

module.exports = router;