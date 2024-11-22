import { Schema, model } from "mongoose";

const schema = new Schema({
  Category: String,
  Price: Number,
  ProductID: { type: Number, unique: true },
  ProductName: String,
});

export default model("Product", schema);