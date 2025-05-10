import { Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(

    @Inject(PRODUCT_SERVICE)
    private readonly productsClient: ClientProxy

  ) {}

  @Post()
  createProduct(){
    return 'crea'
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    return this.productsClient.send({cmd: 'find_all_products'}, paginationDto)
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string){
    return 'el producto' + id
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return 'elimina el producto ' + id
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string){
    return 'Actualiza el producto ' + id
  }

  

}
