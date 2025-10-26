import express from "express";

const app = express();
app.listen(5000, () => {
  console.log("Server is running on port 3000 hello");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.send("Hello World!");
});
