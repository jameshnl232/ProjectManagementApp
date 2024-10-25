import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import teamRoutes from "./routes/teamRoutes";
import userRoutes from "./routes/userRoutes";

/*Routes imports*/

/*Configuration*/
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/teams", teamRoutes);
app.use("/users", userRoutes);

/* SERVER */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
