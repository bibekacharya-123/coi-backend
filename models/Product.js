const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  code: { type: String},
  name: { type: String},
  category: {
    type: String,
    enum: ["apparel", "accessories", "books", "gift"],
  },
  price: { type: Number},
  image: { type: String },
  isNew: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
