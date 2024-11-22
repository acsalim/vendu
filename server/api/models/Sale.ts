import { Schema, model } from "mongoose";

const schema = new Schema({
  Date: Date,
  ProductID: Number,
  Quantity: Number,
  SaleID: Number,
  TotalAmount: Number
});

export default model("Sale", schema);