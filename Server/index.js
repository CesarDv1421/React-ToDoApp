import express, { urlencoded } from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: join(__dirname, './.env') })
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(urlencoded({ extended: false }));

//routes
import notes from "./routes/notes.routes.js";
import auth from "./routes/auth.routes.js";

//middlewares
import validateToken from './middleware/isAuthenticated.js'


app.use("/api", auth);
app.use(validateToken)
app.use("/api", notes);

app.listen(process.env.PORT, () => {
  console.log("Server Listen in the port " + process.env.PORT);
});
