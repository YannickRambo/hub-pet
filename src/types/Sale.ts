import type { SaleItem } from "./SaleItem";

export interface Sale {
    clientId: string;
    items: SaleItem[];
    paymentMethod: string;
    total: number;
}