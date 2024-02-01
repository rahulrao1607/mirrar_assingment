import express from "express";
import { createProduct,deleteProduct,allProduct,updateProduct,addVariant,editVariants,deleteVariants,searchProducts } from "../controllers/productController.js";

const router= express.Router();

//Routes for products
router.post("/createProduct",createProduct);
router.put("/updateProduct/:id",updateProduct);
router.delete("/deleteProduct/:id",deleteProduct);
router.get("/allProduct",allProduct);

// routes for varinats
router.post("/:id/addVariants",addVariant);
router.put("/:productId/editVariants/:variantId",editVariants);
router.delete("/:productId/deleteVariants/:variantId",deleteVariants);

// search functionality
router.get("/search", searchProducts); 

export default router;