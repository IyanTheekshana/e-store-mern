import express from "express";
import { mongo } from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

connectDB();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(5000, () => {
  console.log("Server is running on port 5000 hello");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving products.");
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).send("All product fields are required.");
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).send(`Product ${product.name} added successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding product.");
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send("Product not found.");
    }
    res.send(`Product with id ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting product.");
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongo.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product ID.");
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).send("Product not found.");
    }
    res.send(`Product with id ${id} updated successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating product.");
  }
});

console.log(process.env.MONGO_URI);
