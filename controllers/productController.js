import Products from "../models/productModel.js";

const get = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) throw { code: 404, message: "PRODUCT_NOT_FOUND" };
    return res
      .status(200)
      .json({ status: true, message: "GET_DATA_SUCCESS", data: product });
  } catch (error) {
    res.status(error.code || "500").json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};
const getAll = async (req, res) => {
  try {
    const products = await Products.findAll();
    return res
      .status(200)
      .json({ status: true, message: "GET_PRODUCTS_SUCCESS", data: products });
  } catch (error) {
    res.status(error.code || "500").json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

const create = async (req, res) => {
  try {
    if (!req.body.title) throw { code: 428, message: "Title is required" };
    if (!req.body.description)
      throw { code: 428, message: "Description is required" };
    if (!req.body.stock) throw { code: 428, message: "Stock is required" };
    if (!req.body.price) throw { code: 428, message: "Price is required" };

    const { title, description, price, stock } = req.body;
    const create = await Products.create({
      title,
      description,
      price,
      stock,
    });

    if (!create) {
      throw { code: 500, message: "ADD_PRODUCT_FAILED" };
    }

    return res
      .status(201)
      .json({ status: true, message: "ADD_PRODUCT_SUCCESS", data: create });
  } catch (error) {
    res.status(error.code || "500").json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

const update = async (req, res) => {
  try {
    if (!req.params.id) throw { code: 428, message: "Id is required" };
    if (
      !req.body.title &&
      !req.body.description &&
      !req.body.stock &&
      !req.body.price
    )
      throw { code: 400, message: "UPDATE_FAILED" };
    const id = req.params.id;
    const product = await Products.findOne({
      where: {
        id,
      },
    });

    if (!product) throw { code: 404, message: "PRODUCT_NOT_FOUND" };

    const update = await product.update(req.body);

    return res
      .status(200)
      .json({ status: true, message: "GET_PRODUCT_SUCCESS", data: update });
  } catch (error) {
    res.status(error.code || "500").json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

const destroy = async (req, res) => {
  try {
    if (!req.params.id) throw { code: 428, message: "Id is required" };

    const id = req.params.id;

    const product = await Products.findOne({
      where: {
        id,
      },
    });

    if (!product) throw { code: 404, message: "PRODUCT_NOT_FOUND" };

    await product.destroy();
    return res.status(200).json({
      status: true,
      message: "PRODUCT_DELETED_SUCCESSFULLY",
    });
  } catch (error) {
    res.status(error.code || "500").json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

export { create, update, destroy, get, getAll };
