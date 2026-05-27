import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryItem } from './inventory.schema';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import { AdjustStockInput } from './dto/adjust-stock.input';
import { PubSub } from 'graphql-subscriptions';

export const pubSub = new PubSub();
const { v4: uuidv4 } = require('uuid');
@Injectable()
export class InventoryService {
  private items: InventoryItem[] = [];

  findAll(): InventoryItem[] {
    return this.items;
  }

  findOne(id: string): InventoryItem {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new NotFoundException(`Item ${id} not found`);
    return item;
  }

  getLowStockItems(): InventoryItem[] {
    return this.items.filter((i) => i.stockLevel < i.minStockLevel);
  }

  create(input: CreateInventoryInput): InventoryItem {
    const item: InventoryItem = { id: uuidv4(), ...input };
    this.items.push(item);
    pubSub.publish('stockUpdated', { stockUpdated: item });
    return item;
  }

  update(input: UpdateInventoryInput): InventoryItem {
    const index = this.items.findIndex((i) => i.id === input.id);
    if (index === -1) throw new NotFoundException(`Item ${input.id} not found`);
    this.items[index] = { ...this.items[index], ...input };
    pubSub.publish('stockUpdated', { stockUpdated: this.items[index] });
    return this.items[index];
  }

  adjustStock(input: AdjustStockInput): InventoryItem {
    const index = this.items.findIndex((i) => i.id === input.id);
    if (index === -1) throw new NotFoundException(`Item ${input.id} not found`);
    this.items[index].stockLevel += input.amount;
    pubSub.publish('stockUpdated', { stockUpdated: this.items[index] });
    return this.items[index];
  }

  remove(id: string): string {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException(`Item ${id} not found`);
    this.items.splice(index, 1);
    return `Item ${id} deleted successfully`;
  }
}
