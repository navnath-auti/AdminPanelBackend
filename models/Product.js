const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  SKU: String,
  name: String,
  price: Number,
  images: [String],
});

// console.log("Inside Product.js models file");

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
