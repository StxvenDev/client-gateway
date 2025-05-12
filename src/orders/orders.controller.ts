import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto, PaginationOrderDto } from './dto';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(

    @Inject(ORDER_SERVICE)
    private readonly ordersClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({cmd: 'createOrder'}, createOrderDto);
  }

  @Get()
  findAll(@Query() paginationOrderDto : PaginationOrderDto) {
    return this.ordersClient.send({cmd: 'findAllOrders'}, paginationOrderDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send({cmd: 'findOneOrder'}, {id})
    .pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

}
