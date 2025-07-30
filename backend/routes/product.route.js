import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//all these routes will start with /api/products (from server.js) and then call the respective controller functions from product.controller.js
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
