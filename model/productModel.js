import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        default: 0
      },
      variants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant'
      }]   
});

const Product = mongoose.model("Product",productSchema);

export default Product;