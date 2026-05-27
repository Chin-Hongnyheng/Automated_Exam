export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  supplierId: string;
  stockLevel: number;
  minStockLevel: number;
}
