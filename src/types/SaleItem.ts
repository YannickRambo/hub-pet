import type { Produto } from "../utils/storage";

export interface SaleItem extends Produto {
    quantity: number;
}