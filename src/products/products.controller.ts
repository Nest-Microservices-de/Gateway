import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy} from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination';
import { PRODUCTS_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
  ) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product'},{createProductDto});
  }

  @Get()
  allProducts(@Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return this.productsClient.send({ cmd: 'get_products' }, { page, limit });
  };

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await firstValueFrom(
      this.productsClient.send({ cmd: 'get_product' }, { id })
    )
    return product;
  }

  @Patch(':id')
  async updateProduct(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    const product = await firstValueFrom(
      this.productsClient.send(
        { cmd: 'update_product' },
        {
          id: +id,
          updateProductDto
        })
    )
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {

    const product = await firstValueFrom(
      this.productsClient.send({ cmd: 'delete_product' }, { id: +id })
    )
    return product;
  }
}
