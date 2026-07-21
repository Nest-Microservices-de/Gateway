import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus, OrderStatusLst } from "../enum/orders.enum";

export class CreateOrderDto {
    @IsNumber()
    @IsPositive() 
    totalAmount: number;

    @IsNumber()
    @IsPositive() 
    totalItems: number;

    @IsEnum(OrderStatusLst, {
        message: `Possible status value are ${OrderStatusLst}`
    })
    @IsOptional()
    status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()
    paid: boolean = false


}