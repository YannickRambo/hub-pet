import Styles from "./Inventory.module.css";
import { useState } from "react";
import { products } from "../../utils/products";
import { productTypes } from "../../utils/product-types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export default function Inventory() {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("Todos");

    const filteredProducts = products.filter((product) => {
        const matchesName = product.name
            .toLowerCase()
            .includes(search.trim().toLowerCase());

        const matchesType =
            selectedType === "Todos" ||
            product.type === selectedType;

        return matchesName && matchesType;
    });

    return (
        <main className={Styles.page}>
            <section className={Styles.container}>
                <header className={Styles.heading}>
                    <h1>Controle de Estoque</h1>
                    <p>
                        Consulte os produtos registrados e acompanhe
                        suas quantidades disponíveis.
                    </p>
                </header>

                <section className={Styles.inventoryPanel}>
                    <div className={Styles.filters}>
                        <div className={Styles.field}>
                            <label htmlFor="search">
                                Buscar produto
                            </label>

                            <input
                                id="search"
                                type="search"
                                placeholder="Digite o nome do produto..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
                        </div>

                        <div className={Styles.field}>
                            <label htmlFor="type">
                                Filtrar por tipo
                            </label>

                            <select
                                id="type"
                                value={selectedType}
                                onChange={(event) =>
                                    setSelectedType(event.target.value)
                                }
                            >
                                {productTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={Styles.tableHeader}>
                        <h2>Produtos registrados</h2>

                        <span className={Styles.resultCount}>
                            {filteredProducts.length}{" "}
                            {filteredProducts.length === 1
                                ? "produto"
                                : "produtos"}
                        </span>
                    </div>

                    <div className={Styles.tableContainer}>
                        <table className={Styles.table}>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Tipo</th>
                                    <th>Quantidade</th>
                                    <th>Preço unitário</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.type}</td>
                                            <td>
                                                <span
                                                    className={
                                                        product.quantity <= 5
                                                            ? Styles.lowStock
                                                            : Styles.quantity
                                                    }
                                                >
                                                    {product.quantity}
                                                </span>
                                            </td>
                                            <td>
                                                {currencyFormatter.format(
                                                    product.price
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className={Styles.emptyState}
                                        >
                                            Nenhum produto encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </main>
    );
}