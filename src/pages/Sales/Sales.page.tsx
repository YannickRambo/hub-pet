
import Styles from "./Sales.module.css";
import { useState } from "react";
import { sales } from "../../utils/sales";
import { paymentMethods } from "../../utils/paymentMethods";

export default function Sales() {
    const [search, setSearch] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("Todos");

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);

    const filteredSales = sales.filter((sale) => {
        const matchesSearch =
            sale.client.toLowerCase().includes(search.toLowerCase()) ||
            String(sale.id).includes(search);

        const matchesPayment =
            selectedPayment === "Todos" ||
            sale.paymentMethod === selectedPayment;

        return matchesSearch && matchesPayment;
    });

    return (
        <main className={Styles.sales}>
            <h1>Consultar Vendas</h1>

            <section className={Styles.salesFilters}>
                <div className={Styles.filterGroup}>
                    <label htmlFor="search">Pesquisar venda</label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Nome do cliente ou número da venda..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <div className={Styles.filterGroup}>
                    <label htmlFor="payment">Forma de pagamento</label>
                    <select
                        id="payment"
                        value={selectedPayment}
                        onChange={(event) =>
                            setSelectedPayment(event.target.value)
                        }
                    >
                        {paymentMethods.map((method) => (
                            <option key={method} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <section className={Styles.salesTableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Nº Venda</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Pagamento</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredSales.length > 0 ? (
                            filteredSales.map((sale) => (
                                <tr key={sale.id}>
                                    <td>#{String(sale.id).padStart(4, "0")}</td>
                                    <td>{sale.client}</td>
                                    <td>{sale.date}</td>
                                    <td>{sale.paymentMethod}</td>
                                    <td>{formatCurrency(sale.total)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className={Styles.emptyMessage}>
                                    Nenhuma venda encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
