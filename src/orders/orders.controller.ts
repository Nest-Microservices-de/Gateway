import { Controller, Get, Post, Body,  Param,Inject, Query, Patch } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { StatusOrderDto } from './dto/status-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy) {}
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder',createOrderDto);
  }
  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    const { page, limit, filter } = paginationDto;
    return this.ordersClient.send('findAllOrders',{ page, limit, filter});
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder', id);
  }

  @Patch(':id')
  changeStatus(@Param('id') id: string, @Body() statusDto: StatusOrderDto ){
    const status = statusDto.status
    return this.ordersClient.send('changeStatus',{id, status})
  }

}
