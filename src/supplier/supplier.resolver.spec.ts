import { Test, TestingModule } from '@nestjs/testing';
import { SupplierResolver } from './supplier.resolver';
import { SupplierService } from './supplier.service';

describe('SupplierResolver', () => {
  let resolver: SupplierResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierResolver,
        {
          provide: SupplierService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SupplierResolver>(SupplierResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
