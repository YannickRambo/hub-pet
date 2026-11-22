import Styles from "./RegisterNewSale.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { getClientes, getProdutos, type Produto } from "../../utils/storage";
import { sales } from "../../utils/sales";

interface SaleItem extends Produto {
    quantity: number;
}

export default function RegisterNewSale() {
    const [clients] = useState(() => getClientes());
    const [products] = useState(() => getProdutos());
    const [clientId, setClientId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);

    const navigate = useNavigate();

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);

    const total = saleItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    function handleAddProduct() {
        const product = products.find(
            (item) => String(item.id) === productId
        );

        if (!product || quantity < 1) return;

        setSaleItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + Number(quantity)
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: Number(quantity)
                }
            ];
        });

        setProductId("");
        setQuantity(1);
    }

    function handleRemoveProduct(productId: number | string) {
        setSaleItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        );
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!clientId || saleItems.length === 0 || !paymentMethod) {
            return;
        }

        const sale = {
            clientId,
            items: saleItems,
            paymentMethod,
            total
        };

        sales.push(sale);

        alert("Venda realizada com sucesso!");
    }

    return (
        <main className={Styles.registerSale}>
            <h1>Registrar Venda</h1>

            <form onSubmit={handleSubmit}>
                <section className={Styles.saleSection}>
                    <h2>Dados da venda</h2>

                    <div className={Styles.formGroup}>
                        <label htmlFor="client">Cliente</label>
                        <select
                            id="client"
                            value={clientId}
                            onChange={(event) =>
                                setClientId(event.target.value)
                            }
                            required
                        >
                            <option value="">Selecione um cliente</option>

                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.nome}
                                </option>
                            ))}
                        </select>

                        {clients.length === 0 && (
                            <small>
                                Nenhum cliente cadastrado ainda.{" "}
                                <Link to="/hub-pet/clientes/novo">
                                    Cadastre um cliente e pet
                                </Link>
                                .
                            </small>
                        )}
                    </div>
                </section>

                <section className={Styles.saleSection}>
                    <h2>Produtos</h2>

                    <div className={Styles.productForm}>
                        <div className={Styles.formGroup}>
                            <label htmlFor="product">Produto</label>
                            <select
                                id="product"
                                value={productId}
                                onChange={(event) =>
                                    setProductId(event.target.value)
                                }
                            >
                                <option value="">Selecione um produto</option>

                                {products.map((product) => (
                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name} - {formatCurrency(product.price)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={Styles.formGroup}>
                            <label htmlFor="quantity">Quantidade</label>
                            <input
                                type="number"
                                id="quantity"
                                min="1"
                                value={quantity}
                                onChange={(event) =>
                                    setQuantity(Number(event.target.value))
                                }
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleAddProduct}
                            disabled={!productId || quantity < 1}
                        >
                            Adicionar produto
                        </button>
                    </div>

                    <div className={Styles.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Valor unitário</th>
                                    <th>Quantidade</th>
                                    <th>Subtotal</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>

                            <tbody>
                                {saleItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={5}>
                                            Nenhum produto adicionado.
                                        </td>
                                    </tr>
                                ) : (
                                    saleItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{formatCurrency(item.price)}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                {formatCurrency(
                                                    item.price * item.quantity
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className={Styles.removeButton}
                                                    onClick={() =>
                                                        handleRemoveProduct(item.id)
                                                    }
                                                >
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={Styles.saleSection}>
                    <h2>Pagamento</h2>

                    <div className={Styles.formGroup}>
                        <label htmlFor="paymentMethod">
                            Forma de pagamento
                        </label>

                        <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(event) =>
                                setPaymentMethod(event.target.value)
                            }
                            required
                        >
                            <option value="">Selecione uma forma de pagamento</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Pix">Pix</option>
                            <option value="Cartão de débito">Cartão de débito</option>
                            <option value="Cartão de crédito">Cartão de crédito</option>
                        </select>
                    </div>

                    <div className={Styles.saleTotal}>
                        <span>Total da venda</span>
                        <strong>{formatCurrency(total)}</strong>
                    </div>
                </section>

                <div className={Styles.saleActions}>
                    <button
                        type="button"
                        className={Styles.cancelButton}
                        onClick={() => {
                            navigate("/hub-pet")
                        }}
                    >
                        Voltar
                    </button>
                    <button
                        type="button"
                        className={Styles.cancelButton}
                        onClick={() => {
                            setSaleItems([]);
                            setClientId("");
                            setPaymentMethod("");
                        }}
                    >
                        Limpar venda
                    </button>

                    <button
                        type="submit"
                        disabled={
                            !clientId ||
                            saleItems.length === 0 ||
                            !paymentMethod
                        }
                    >
                        Finalizar venda
                    </button>
                </div>
            </form>
        </main>
    );
}
