const Product = require("../models/Product");

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const { code, name, category, price, isNew } = req.body;

    if (!code || !name || !category || !price) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) {
      return res.status(400).json({ error: "Image is required." });
    }

    const product = new Product({
      code,
      name,
      category,
      price,
      isNew,
      image,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { code, name, category, price, isNew } = req.body;

    if (!code || !name || !category || !price) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const updateData = { code, name, category, price, isNew };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
