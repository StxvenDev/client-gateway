import { BadRequestException, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
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
  async findOneProduct(@Param('id') id: string){
    try {
      const product = await firstValueFrom(
        this.productsClient.send({cmd: 'find_one_products'}, {id})
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
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
