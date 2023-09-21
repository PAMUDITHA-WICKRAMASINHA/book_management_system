import { config } from "dotenv";
config();
import express from 'express';
import middlewaresConfig from "./config/middlewares";
import apiRoutes from "./routes/index";

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Book Management');
});

middlewaresConfig(app);

const PATH = {
  API: "/api",
};

app.use(PATH.API, apiRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
