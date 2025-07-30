import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); //passing an empty object - fetch all products
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error while updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    // If the product is not found or there's an error
    console.log("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
