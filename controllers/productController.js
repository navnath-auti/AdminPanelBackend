const Product = require("../models/Product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    console.log("product>>>", product);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all products
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { sku } = req.params;
  const { name, price, images } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { SKU: sku },
      { name, price, images },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
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
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
