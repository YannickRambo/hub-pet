import Styles from "./Inventory.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { products as initialProducts } from "../../utils/products";
import { productTypes } from "../../utils/product-types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface Product {
  id: number | string;
  name: string;
  type: string;
  quantity: number;
  price: number;
}

export default function Inventory() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [products, setProducts] = useState<Product[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState(productTypes[1] || "Medicamento");
  const [newQuantity, setNewQuantity] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // Carrega do localStorage ou inicia com os produtos padrão do projeto
  useEffect(() => {
    const savedProducts = localStorage.getItem("@HubPet:inventory");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem(
        "@HubPet:inventory",
        JSON.stringify(initialProducts),
      );
    }
  }, []);

  // Função para atualizar (dar baixa ou somar) a quantidade em estoque (RF06)
  function handleUpdateQuantity(id: number | string, delta: number) {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const newQuantity = product.quantity + delta;
        return { ...product, quantity: newQuantity >= 0 ? newQuantity : 0 };
      }
      return product;
    });

    setProducts(updatedProducts);
    localStorage.setItem("@HubPet:inventory", JSON.stringify(updatedProducts));
  }

  // Função para cadastrar novo produto
  function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newQuantity || !newPrice) {
      alert("Por favor, preencha todos os campos do produto!");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: newName,
      type: newType,
      quantity: Number(newQuantity),
      price: Number(newPrice),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("@HubPet:inventory", JSON.stringify(updatedProducts));

    setNewName("");
    setNewQuantity("");
    setNewPrice("");
    setShowForm(false);
  }

  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesType =
      selectedType === "Todos" || product.type === selectedType;

    return matchesName && matchesType;
  });

  return (
    <main className={Styles.page}>
      <section className={Styles.container}>
        {/* Cabeçalho limpo com Título na esquerda e os dois botões juntos na direita */}
        <header className={Styles.heading}>
          <div>
            <h1>Controle de Estoque</h1>
            <p>
              Consulte os produtos registrados e acompanhe suas quantidades
              disponíveis.
            </p>
          </div>

          <div className={Styles.headerButtons}>
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className={Styles.addButton}
            >
              {showForm ? "Fechar" : "+ Cadastrar Novo Produto"}
            </button>

            <button
              type="button"
              className={Styles.backButton}
              onClick={() => navigate("/hub-pet")}
            >
              Voltar
            </button>
          </div>
        </header>

        {/* Formulário de Cadastro (Abre/Fecha ao clicar no botão acima) */}
        {showForm && (
          <form onSubmit={handleAddProduct} className={Styles.formCard}>
            <h3>Novo Produto</h3>
            <div className={Styles.formGrid}>
              <input
                type="text"
                placeholder="Nome do produto"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                {productTypes
                  .filter((t) => t !== "Todos")
                  .map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
              <input
                type="number"
                placeholder="Quantidade"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Preço (R$)"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <button type="submit" className={Styles.submitButton}>
              Salvar Produto
            </button>
          </form>
        )}

        <section className={Styles.inventoryPanel}>
          <div className={Styles.filters}>
            <div className={Styles.field}>
              <label htmlFor="search">Buscar produto</label>
              <input
                id="search"
                type="search"
                placeholder="Digite o nome do produto..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className={Styles.field}>
              <label htmlFor="type">Filtrar por tipo</label>
              <select
                id="type"
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
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
              {filteredProducts.length === 1 ? "produto" : "produtos"}
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
                  <th>Ações (Estoque)</th>
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
                          {product.quantity} un.
                        </span>
                      </td>
                      <td>{currencyFormatter.format(product.price)}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(product.id, -1)}
                            className={Styles.btnAction}
                            title="Diminuir"
                          >
                            -
                          </button>
                          <span
                            style={{ minWidth: "20px", textAlign: "center" }}
                          >
                            {product.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(product.id, 1)}
                            className={Styles.btnAction}
                            title="Aumentar"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className={Styles.emptyState}>
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
