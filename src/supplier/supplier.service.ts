import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { Supplier } from './supplier.schema';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';

const { v4: uuidv4 } = require('uuid');
@Injectable()
export class SupplierService {
  private suppliers: Supplier[] = [];
  findAll(): Supplier[] {
    return this.suppliers;
  }

  findOne(id: string): Supplier {
    const supplier = this.suppliers.find((s) => s.id === id);
    if (!supplier) throw new NotFoundException(`Supplier ${id} not found`);
    return supplier;
  }

  create(input: CreateSupplierInput): Supplier {
    const supplier: Supplier = { id: uuidv4(), ...input };
    this.suppliers.push(supplier);
    return supplier;
  }

  update(input: UpdateSupplierInput): Supplier {
    const index = this.suppliers.findIndex((s) => s.id === input.id);
    if (index === -1)
      throw new NotFoundException(`Supplier ${input.id} not found`);
    this.suppliers[index] = { ...this.suppliers[index], ...input };
    return this.suppliers[index];
  }

  remove(id: string): string {
    const index = this.suppliers.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException(`Supplier ${id} not found`);
    this.suppliers.splice(index, 1);
    return `Supplier ${id} deleted successfully`;
  }
}
