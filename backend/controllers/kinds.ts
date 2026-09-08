
import type { Request, Response } from "express";
import Kinds from "../modals/kinds.ts";




export const createProductKinds = async (req: Request, res: Response) => {
  try {
    const products = await Kinds.create(req.body);
    res.status(201).json(products);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//get all kinds
export const getAllKinds = async (req: Request, res: Response) => {
  try {
    const products = await Kinds.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get single kind
export const getSingleKinds = async (req: Request, res: Response) => {
  try {
    const product = await Kinds.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update kind
export const updateProductKinds = async (req: Request, res: Response) => {
  try {
    const product = await Kinds.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete kind
export const deleteProductKinds = async (req: Request, res: Response) => {
  try {
    const product = await Kinds.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

