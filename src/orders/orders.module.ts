import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_SERVICE } from 'src/config';

@Module({
  imports:[
    ClientsModule.register([
      {
        name:ORDERS_SERVICE,
        transport:Transport.TCP,
        options:{
          host:envs.ORDERS_SERVICE_HOST,
          port:envs.ORDERS_SERVICE_PORT
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
