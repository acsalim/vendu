import express from "express";
import router from "./routes";
import mongoose from "mongoose";

const app = express();


mongoose.connect(useRuntimeConfig().DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/', router);
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

export default fromNodeMiddleware(app);