import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
// import { CreateOrdersDto } from './dto/create-orders.dto';
// import { UpdateOrdersDto } from './dto/update-orders.dto';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOreder(id);
  }
  @Post('path')
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  // @Post()
  // create(@Body() createOrdersDto: CreateOrdersDto) {
  //   return this.ordersService.create(createOrdersDto);
  // }

  // @Get()
  // findAll() {
  //   return this.ordersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ordersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrdersDto: UpdateOrdersDto) {
  //   return this.ordersService.update(+id, updateOrdersDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
