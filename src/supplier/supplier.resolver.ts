import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierType } from './dto/supplier.type';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class SupplierResolver {
  constructor(private supplierService: SupplierService) {}

  @Query(() => [SupplierType])
  getSuppliers() {
    return this.supplierService.findAll();
  }

  @Query(() => SupplierType)
  getSupplier(@Args('id', { type: () => ID }) id: string) {
    return this.supplierService.findOne(id);
  }

  @Mutation(() => SupplierType)
  createSupplier(@Args('input') input: CreateSupplierInput) {
    return this.supplierService.create(input);
  }

  @Mutation(() => SupplierType)
  updateSupplier(@Args('input') input: UpdateSupplierInput) {
    return this.supplierService.update(input);
  }

  @Mutation(() => String)
  deleteSupplier(@Args('id', { type: () => ID }) id: string) {
    return this.supplierService.remove(id);
  }
}
