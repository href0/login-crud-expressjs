import express from "express";
import bodyParser from "body-parser";

// CONFIG
import database from "./config/database.js";

// MODELS
// import Products from "./models/productModel.js";

// ROUTES
import productRoute from "../crud-product/routes/productRoute.js";

const port = process.env.PORT || 8800;

const app = express();

const connectDB = async () => {
  try {
    await database.authenticate();
    // await Users.sync();
    // await Products.sync();
    console.log("Database connected!");
  } catch (error) {
    console.error("Database Error: " + error);
  }
};
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/products", productRoute);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
