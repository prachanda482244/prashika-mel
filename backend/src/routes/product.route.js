import { Router } from "express";
import { authorizeAdmin, verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  productImageDelete,
  updateProductDetails,
  updateProductImage,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = Router();
productRouter.use(verifyJwt);
productRouter.use(authorizeAdmin);
productRouter.route("/create-product").post(
  upload.fields([
    {
      name: "image",
      maxCount: 3,
    },
  ]),
  createProduct
);
productRouter.route("/get-all-products").get(getAllProducts);
productRouter.route("/update-product-details/:id").patch(updateProductDetails);
productRouter
  .route("/update-product-image/:productId")
  .patch(upload.array("image", 3), updateProductImage);
productRouter.route("/delete-product/:id").delete(deleteProduct);
productRouter.route("/product-image-delete/:id").delete(productImageDelete);
export default productRouter;