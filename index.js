import express from "express";
import bodyParser from "body-parser";

// CONFIG
import database from "./config/database.js";

// MODELS
// import Users from "./models/userModel.js";

// ROUTES
import authRoutes from "./routes/authRoute.js";

const port = process.env.PORT || 3000;

const app = express();

const connectDB = async () => {
  try {
    await database.authenticate();
    // await Users.sync({ force: true });
    // await Products.sync({ alter: true });
    console.log("Database connected!");
  } catch (error) {
    console.error("Database Error: " + error);
  }
};
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
