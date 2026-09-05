import mongoose, { Document, Schema } from "mongoose";

// Interface-ka Product-ka ee TypeScript
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
 // Qiimaha aad ka soo iibinayso supplier-ka (Qarsoodi)
  category: string;
  images: string[];
  stock: number;

  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

  

    category: {
      type: String,
      required: true,
      trim: true,
    },

   images: {
      type: [String],
      required: true,
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

   
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;