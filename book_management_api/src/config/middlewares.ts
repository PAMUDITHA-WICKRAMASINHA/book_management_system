import bodyParser from "body-parser";
import cors from "cors";

export default (app) => {
  app.use(cors());
  app.options("*", cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
