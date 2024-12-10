import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryDocument } from './entity/category.schema';
import { CategoryQuery } from './dto/category.intefaces';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: CategoryDto): Promise<CategoryDocument> {
    return this.categoryService.create(data);
  }

  @Get()
  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryService.findAll();
  }

  @Get('find')
  async findOne(@Query() query: CategoryQuery): Promise<CategoryDocument> {
    return this.categoryService.findOne(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CategoryDocument> {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() data: CategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoryService.updateById(id, data);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<string> {
    return this.categoryService.deleteById(id);
  }
}
