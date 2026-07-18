import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCTS_SERVICE } from 'src/config';

@Module({
  imports:[
     ClientsModule.register([
      {
        name:PRODUCTS_SERVICE, 
        transport: Transport.TCP,
        options:{
          host:envs.PRODUCTS_SERVICE_HOST,
          port:envs.PRODUCTS_SERVICE_PORT 
        }
      }
     ])
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
