import type { SaleItem } from "./SaleItem";

export interface Sale {
    // Número sequencial da venda (1, 2, 3...)
    id: number;
    clientId: string;
    items: SaleItem[];
    paymentMethod: string;
    total: number;
}