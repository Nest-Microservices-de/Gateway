import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { OrdersController } from './orders.controller';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';

describe('OrdersController', () => {
  let controller: OrdersController;

  const ordersClientMock = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: ORDERS_SERVICE,
          useValue: ordersClientMock,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);

    // Limpia el historial de llamadas del mock antes de cada prueba
    jest.clearAllMocks();
  });

  describe('Controller initialization', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('create()', () => {
    it('should send createOrder message', () => {
      const dto: CreateOrderDto = {
        customerId: 1,
        items: [
          {
            productId: 10,
            quantity: 2,
          },
        ],
      };

      ordersClientMock.send.mockReturnValue(of(dto));

      controller.create(dto);

      expect(ordersClientMock.send).toHaveBeenCalledTimes(1);

      expect(ordersClientMock.send).toHaveBeenCalledWith(
        'createOrder',
        dto,
      );
    });
  });

  describe('findAll()', () => {
    it('should send findAllOrders message', () => {
      ordersClientMock.send.mockReturnValue(of([]));

      controller.findAll();

      expect(ordersClientMock.send).toHaveBeenCalledTimes(1);

      expect(ordersClientMock.send).toHaveBeenCalledWith(
        'findAllOrders',
        {},
      );
    });
  });

  describe('findOne()', () => {
    it('should send findOneOrder message', () => {
      const order = {
        id: 1,
      };

      ordersClientMock.send.mockReturnValue(of(order));

      controller.findOne('1');

      expect(ordersClientMock.send).toHaveBeenCalledTimes(1);

      expect(ordersClientMock.send).toHaveBeenCalledWith(
        'findOneOrder',
        {
          id: '1',
        },
      );
    });
  });
});