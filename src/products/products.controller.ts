import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(

    @Inject(PRODUCT_SERVICE)
    private readonly productsClient: ClientProxy

  ) {}

  @Post()
  async createProduct(@Body() createProduct: CreateProductDto){
    return this.productsClient.send({cmd: 'create_product'},createProduct)
    .pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    return this.productsClient.send({cmd: 'find_all_products'}, paginationDto)
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string){
    return this.productsClient.send({cmd: 'find_one_products'}, {id})
    .pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return this.productsClient.send({cmd: 'delete_product'}, {id})
    .pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductDto
  ){
    return this.productsClient.send({cmd: 'update_product'}, {
      id,
      ...updateProduct
    })
    .pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

  

}
