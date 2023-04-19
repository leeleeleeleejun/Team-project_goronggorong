import { model } from 'mongoose';
import ProductSchema  from '../schemas/product-schema.js';

const Product = model('Product', ProductSchema);

class ProductModel {
  async create(productInfo) {
    const newProduct = await Product.create(productInfo);
    return newProduct;
  }

  async findAll() {
    const allProducts = await Product.find({});
    return allProducts;
  }

  async findByCategory(category) {
    const foundProduct = await Product.find({ category });
    return foundProduct;
  }

  async findById(id) {
    const foundProduct = await Product.findOne({ id });
    return foundProduct;
  }

  async findByName(name) {
    const foundProduct = await Product.findOne({ name });
    return foundProduct;
  }

  async update({ id, update }) {
    const updatedProduct = Product.findOneAndUpdate({ id, returnOriginal: false }, update);
    return updatedProduct;
  }

  async delete(id) {
    const deletedProduct = await Product.findOneAndDelete({ id, returnOriginal: false });
    return deletedProduct;
  }
}

const productModel = new ProductModel();

export default productModel;
