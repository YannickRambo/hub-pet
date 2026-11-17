import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Styles from "./ConsultClients.module.css";

interface Cadastro {
  id: number;
  cliente: {
    nome: string;
    telefone: string;
    email: string;
    cpf: string;
  };
  pet: {
    nome: string;
    especie: string;
    raca: string;
    idade: string;
  };
}

export default function ConsultClients() {
  const navigate = useNavigate();
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const dadosSalvos = JSON.parse(
      localStorage.getItem("@HubPet:clientesPets") || "[]",
    );
    setCadastros(dadosSalvos);
  }, []);

  const cadastrosFiltrados = cadastros.filter(
    (item) =>
      item.cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.cliente.cpf.includes(busca) ||
      item.pet.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <main className={Styles.page}>
      {/* Cabeçalho igual ao padrão da imagem (Título centralizado e subtítulo) */}
      <div className={Styles.headerCenter}>
        <h1>Consulta de Clientes e Pets</h1>
        <p>
          Pesquise e visualize os clientes e animais cadastrados no sistema.
        </p>
      </div>

      {/* Card Principal Centralizado (exatamente como no modelo de Agendamento) */}
      <section className={Styles.container}>
        {/* Cabeçalho interno com o botão de voltar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1.5rem",
          }}
        >
          <button
            type="button"
            className={Styles.backButton}
            onClick={() => navigate("/hub-pet")}
          >
            Voltar
          </button>
        </div>

        {/* Barra de Pesquisa */}
        <div className={Styles.searchContainer}>
          <label
            htmlFor="search"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
              color: "#1e293b",
            }}
          >
            Pesquisar Cliente ou Pet
          </label>
          <input
            id="search"
            type="search"
            placeholder="Digite o nome do cliente, CPF ou nome do pet..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={Styles.searchInput}
          />
        </div>

        {/* Tabela ou Mensagem Vazia dentro do card */}
        {cadastrosFiltrados.length === 0 ? (
          <p className={Styles.emptyText}>Nenhum cliente ou pet encontrado.</p>
        ) : (
          <div className={Styles.tableContainer}>
            <table className={Styles.table}>
              <thead>
                <tr>
                  <th className={Styles.th}>Cliente</th>
                  <th className={Styles.th}>Contato</th>
                  <th className={Styles.th}>CPF</th>
                  <th className={Styles.th}>Nome do Pet</th>
                  <th className={Styles.th}>Espécie / Raça</th>
                  <th className={Styles.th}>Idade</th>
                </tr>
              </thead>
              <tbody>
                {cadastrosFiltrados.map((item) => (
                  <tr key={item.id}>
                    <td className={Styles.td} style={{ fontWeight: "bold" }}>
                      {item.cliente.nome}
                    </td>
                    <td className={Styles.td}>
                      {item.cliente.telefone}
                      <br />
                      <small style={{ color: "#64748b" }}>
                        {item.cliente.email}
                      </small>
                    </td>
                    <td className={Styles.td}>{item.cliente.cpf}</td>
                    <td
                      className={Styles.td}
                      style={{ fontWeight: "bold", color: "#0f172a" }}
                    >
                      {item.pet.nome}
                    </td>
                    <td className={Styles.td}>
                      {item.pet.especie} - {item.pet.raca}
                    </td>
                    <td className={Styles.td}>{item.pet.idade} ano(s)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
