
import Styles from "./Sales.module.css";
import { useState } from "react";
import { sales } from "../../utils/sales";
import { paymentMethods } from "../../utils/paymentMethods";
import { useNavigate } from "react-router";

export default function Sales() {
    const [search, setSearch] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("Todos");
    const navigate = useNavigate();

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);

    const filteredSales = sales.filter((sale) => {
        const matchesSearch =
            sale.clientId.toLowerCase().includes(search.toLowerCase()) ||
            sale.clientId.includes(search);

        const matchesPayment =
            selectedPayment === "Todos" ||
            sale.paymentMethod === selectedPayment;

        return matchesSearch && matchesPayment;
    });

    return (
        <main className={Styles.sales}>
            <div className={Styles.headerCenter}>
                <h1>Consulta de Vendas</h1>
            </div>
            <div className={Styles.buttonContainer}>
                <button className={Styles.backButton} onClick={() => navigate("/hub-pet")}>Voltar</button>
            </div>
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
                            <th>Itens</th>
                            <th>Pagamento</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredSales.length > 0 ? (
                            filteredSales.map((sale) => (
                                <tr key={sale.clientId}>
                                    <td>#{sale.clientId.padStart(4, "0")}</td>
                                    <td>{sale.items.map(item => item.name).toString()}</td>
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
