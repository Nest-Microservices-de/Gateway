import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(){
    return 'Product created successfully';
  }

  @Get()
  allProducts(){
     return 'All products';
  };

  @Get(':id')
  getProductById(){
    return 'Product by id';
  }

  @Patch(':id')
  updateProduct(){
    return 'Product updated successfully';
  }

  @Delete(':id')
  deleteProduct(){
    return 'Product deleted successfully';
  }



}
