const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/create", createProduct);
router.get("/getAll", getAllProduct);
router.put("/update/:sku", updateProduct);
router.delete("/delete/:sku", deleteProduct);

module.exports = router;
