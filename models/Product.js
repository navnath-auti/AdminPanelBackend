const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  SKU: String,
  name: String,
  price: Number,
  images: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
