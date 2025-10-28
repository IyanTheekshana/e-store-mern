import express from "express";
import { connectDB } from "./config/db.js";
import productsRouter from "./products/product.route.js";

connectDB();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(5000, () => {
  console.log("Server is running on port 5000 hello");
});

app.use("/api/products", productsRouter);

console.log(process.env.MONGO_URI);
