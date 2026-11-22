import type { Sale } from "../types/Sale";

export const sales: Sale[] = [
    {
        clientId: "1",
        items: [
            {
                id: 1,
                name: "Condicionador Pet",
                price: 10.0,
                quantity: 1,
                type: ""
            }
        ],
        paymentMethod: "Pix",
        total: 125.90
    }
];