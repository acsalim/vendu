import mongoose from "mongoose";
import Sale from "../models/Sale";
import Product from "../models/Product";
import config from '../../../env.json';

export default class DB {
  static connect() {
    try {
      mongoose.connect(config.DATABASE_URL);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }

  static disconnect() {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }

  static Product = Product;
  static Sale = Sale;
}