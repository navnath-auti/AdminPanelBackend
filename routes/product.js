const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a new product
router.post("/create", async (req, res) => {
  try {
    const product = new Product(req.body);
    console.log("product>>>", product);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all products
router.get("/getAll", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    // Find and update the product
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a product by ID
router.delete("/delete/:sku", async (req, res) => {
  const skuToDelete = req.params.sku;

  try {
    const deletedProduct = await Product.findOneAndDelete({ SKU: skuToDelete });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Could not delete the product" });
  }
});

module.exports = router;
