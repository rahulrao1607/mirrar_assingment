import Product from "../model/productModel.js";
import Variant from "../model/variantModel.js";

const createProduct = async(req,res)=>{
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
      } catch (error) {
        res.status(400).send(error);
      }
};

const updateProduct = async(req,res)=>{
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['name', 'description', 'price', 'variants'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send({message:"no product found"});
        }

        res.status(201).send(product);
       }catch (error) {
        res.status(400).send(error);
       }
};

const allProduct = async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(201).send(products);
      } catch (error) {
        res.status(500).send(error);
      }
};

const deleteProduct = async(req,res)=>{
  const productId = req.params.id;
  console.log(productId);
    try {

        const product = await Product.findByIdAndDelete(productId);
    
        if (!product) {
          return res.status(404).send({message:"Error no product found"});
        } 
        return res.status(201).send({message:"Deleted Sucessfully"});
      } catch (error) {
        res.status(500).send(error);
      }
};

const addVariant = async(req,res)=>{

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }

    const variant = new Variant(req.body);
    variant.product = product; // Set up the reference
    await variant.save();

    product.variants.push(variant);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }

};

const editVariants = async(req,res)=>{
  const { productId, variantId } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findById(productId).populate('variants');
    if (!product) {
      return res.status(404).send('Product not found');
    }
    const variantIndex = product.variants.findIndex(variant => variant._id.equals(variantId));

    if (variantIndex === -1) {
      return res.status(404).send('Variant not found in the product');
    }
    const variant = product.variants[variantIndex];
    Object.keys(updates).forEach(update => {
      variant[update] = updates[update];
    });

    await variant.save();
    res.status(201).send({ product });

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteVariants = async(req,res)=>{
  const { productId, variantId } = req.params;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send();
    }

    const variantIndex = product.variants.findIndex(variant => variant._id.equals(variantId));
    if (variantIndex === -1) {
      return res.status(404).send('Variant not found in the product');
    }
    product.variants.splice(variantIndex, 1);
    await product.save();
    await Variant.findByIdAndDelete(variantId);
    res.status(201).json({message:"Variant deleted sucessfully"});
  } catch (error) {
    res.status(500).send(error);
  }

};


const searchProducts = async(req,res)=>{
 const searchText = req.query.searchText;

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: searchText, $options: 'i' } }, 
        { description: { $regex: searchText, $options: 'i' } }, 
        { variants: { $elemMatch: { name: { $regex: searchText, $options: 'i' } } } } 
      ]
    }).populate('variants');
    console.log(products);


    res.status(201).send(products);
  } catch (error) {
    res.status(500).send(error);
  }

};



export {createProduct,updateProduct,allProduct ,deleteProduct,addVariant,editVariants,deleteVariants,searchProducts};