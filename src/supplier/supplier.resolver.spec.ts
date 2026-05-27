import { Test, TestingModule } from '@nestjs/testing';
import { SupplierResolver } from './supplier.resolver';

describe('SupplierResolver', () => {
  let resolver: SupplierResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierResolver],
    }).compile();

    resolver = module.get<SupplierResolver>(SupplierResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
