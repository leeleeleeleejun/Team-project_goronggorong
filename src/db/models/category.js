import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category';

const Category = model('Category', CategorySchema)

class CategoryModel {
    async findAll() {
        const AllCategories = await Category.find({});
    
        return AllCategories;
      }
}

const CategoryModel = new CategoryModel();

export {CategoryModel}