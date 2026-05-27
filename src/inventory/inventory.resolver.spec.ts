import { Test, TestingModule } from '@nestjs/testing';
import { InventoryResolver } from './inventory.resolver';
import { InventoryService } from './inventory.service';

describe('InventoryResolver', () => {
  let resolver: InventoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryResolver,
        {
          provide: InventoryService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            getLowStockItems: jest.fn(),
            adjustStock: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<InventoryResolver>(InventoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
