import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    sku: {
      type: String,
      required: true,
      unique: true
    },
    additionalCost: {
      type: Number,
      default: 0
    },
    stockCount: {
      type: Number,
      default: 0
    }

});
  
const Variant = mongoose.model("Variant", variantSchema);
  
export default Variant;