import { IsEnum,  IsOptional } from "class-validator";
import { OrderStatus, OrderStatusLst } from "../enum/orders.enum";

export class StatusOrderDto {
    @IsEnum(OrderStatusLst, {
        message: `Possible status value are ${OrderStatusLst}`
    })
    @IsOptional()
    status: OrderStatus;

}