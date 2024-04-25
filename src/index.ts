import routes from "./routes";
import "./database/config/connection";
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.listen(PORT, () => console.log(`Server listening at ${PORT}`));

export default app;
