import express, { urlencoded } from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(urlencoded({ extended: false }));

//routes
import home from "./routes/index.routes.js";
import auth from "./routes/auth.routes.js";


app.use("/auth", auth);
app.use("/home", home);

app.listen(3000, () => {
  console.log("Server Listen in the port 3000");
});
