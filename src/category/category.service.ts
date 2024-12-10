import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entity/category.schema';
import { Model } from 'mongoose';
import { CategoryDto } from './dto/category.dto';
import { CategoryQuery } from './dto/category.intefaces';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(data: CategoryDto): Promise<CategoryDocument> {
    return this.categoryModel.create(data);
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find();
  }

  async findOne(query: CategoryQuery): Promise<CategoryDocument> {
    const category = await this.categoryModel.findOne(query);

    if (category === null) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findById(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(id);

    if (category === null) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }

    return category;
  }

  async updateById(id: string, data: CategoryDto): Promise<CategoryDocument> {
    const category = await this.categoryModel.findByIdAndUpdate(id, data);

    if (category === null) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }

    return category;
  }

  async deleteById(id: string): Promise<string> {
    const category = await this.categoryModel.findByIdAndDelete(id);

    if (category === null) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }

    return `Category with id: ${id} successfully deleted`;
  }
}
