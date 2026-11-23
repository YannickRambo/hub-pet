
import Styles from "./Sales.module.css";
import { useState } from "react";
import { paymentMethods } from "../../utils/paymentMethods";
import { useNavigate } from "react-router";
import { getClientes, getVendas } from "../../utils/storage";

// Remove acentos e ignora maiúsculas/minúsculas para a pesquisa
const normalize = (text: string) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

export default function Sales() {
    const [search, setSearch] = useState("");
    const [clients] = useState(() => getClientes());
    const [sales] = useState(() => getVendas());
    const [selectedPayment, setSelectedPayment] = useState("Todos");
    const navigate = useNavigate();

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);

    // A venda guarda só o id do cliente (CPF); aqui buscamos o nome no cadastro
    const getClientName = (clientId: string) =>
        clients.find((client) => client.id === clientId)?.nome ?? clientId;

    const term = normalize(search);

    const filteredSales = sales.filter((sale) => {
        const matchesSearch =
            !term ||
            normalize(getClientName(sale.clientId)).includes(term) ||
            normalize(sale.clientId).includes(term);

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
                        placeholder="Nome ou CPF do cliente..."
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
                            <th>Itens</th>
                            <th>Pagamento</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredSales.length > 0 ? (
                            filteredSales.map((sale) => (
                                <tr key={sale.id}>
                                    <td>#{String(sale.id).padStart(4, "0")}</td>
                                    <td>{getClientName(sale.clientId)}</td>
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
