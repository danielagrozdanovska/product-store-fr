import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); //for Dpl

app.use(express.json()); // allows us to accept JSON data in req.body

app.use("/api/products", productRoutes); // Calling product.route.js file

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // Serve static files from the React app - __dirname is the root directory of the project (go there and then go to frontend/dist)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    //so ova se vrakja celata app so ja imame
  });
}

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
