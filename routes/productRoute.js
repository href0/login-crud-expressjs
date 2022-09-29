import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  create,
  update,
  destroy,
  get,
  getAll,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, get);
router.post("/", verifyToken, create);
router.put("/:id?", verifyToken, update);
router.delete("/:id?", verifyToken, destroy);

export default router;
