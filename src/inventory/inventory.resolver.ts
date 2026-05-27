import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { InventoryService, pubSub } from './inventory.service';
import { InventoryType } from './dto/inventory.type';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import { AdjustStockInput } from './dto/adjust-stock.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class InventoryResolver {
  constructor(private inventoryService: InventoryService) {}

  @Query(() => [InventoryType])
  getInventories() {
    return this.inventoryService.findAll();
  }

  @Query(() => InventoryType)
  getInventory(@Args('id', { type: () => ID }) id: string) {
    return this.inventoryService.findOne(id);
  }

  @Query(() => [InventoryType])
  getLowStockItems() {
    return this.inventoryService.getLowStockItems();
  }

  @Mutation(() => InventoryType)
  createInventory(@Args('input') input: CreateInventoryInput) {
    return this.inventoryService.create(input);
  }

  @Mutation(() => InventoryType)
  updateInventory(@Args('input') input: UpdateInventoryInput) {
    return this.inventoryService.update(input);
  }

  @Mutation(() => InventoryType)
  adjustStock(@Args('input') input: AdjustStockInput) {
    return this.inventoryService.adjustStock(input);
  }

  @Mutation(() => String)
  deleteInventory(@Args('id', { type: () => ID }) id: string) {
    return this.inventoryService.remove(id);
  }

  @Subscription(() => InventoryType)
  stockUpdated() {
    return pubSub.asyncIterableIterator('stockUpdated');
  }
}
