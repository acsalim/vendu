import express from "express";
import router from "./routes";
import DB from "./models";

const app = express();
DB.connect();
app.use(express.json());
app.use('/', router);
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

export default fromNodeMiddleware(app);