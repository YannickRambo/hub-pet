import Styles from "./RegisterNewClient.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function RegisterNewClient() {
  const navigate = useNavigate();

  const [nomeCliente, setNomeCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  const [nomePet, setNomePet] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoCadastro = {
      id: Date.now(),
      cliente: {
        nome: nomeCliente,
        telefone,
        email,
        cpf,
      },
      pet: {
        nome: nomePet,
        especie,
        raca,
        idade,
      },
    };

    const cadastrosSalvos = JSON.parse(
      localStorage.getItem("@HubPet:clientesPets") || "[]",
    );

    const listaAtualizada = [...cadastrosSalvos, novoCadastro];
    localStorage.setItem(
      "@HubPet:clientesPets",
      JSON.stringify(listaAtualizada),
    );

    alert("Cliente e Pet cadastrados com sucesso!");

    navigate("/hub-pet");
  };

  return (
    <main className={Styles.page}>
      <section className={Styles.formContainer}>
        <div className={Styles.pageHeading}>
          <h1>Cadastrar Cliente e Pet</h1>
        </div>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <div className={Styles.formSections}>
            <section className={Styles.formSection}>
              <h2>Dados do Cliente</h2>

              <div className={Styles.field}>
                <label htmlFor="nomeCliente">Nome completo</label>

                <input
                  id="nomeCliente"
                  name="nomeCliente"
                  type="text"
                  placeholder="Nome do cliente"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className={Styles.field}>
                <label htmlFor="telefone">Telefone</label>

                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>

              <div className={Styles.field}>
                <label htmlFor="email">E-mail</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={Styles.field}>
                <label htmlFor="cpf">CPF</label>

                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  autoComplete="off"
                  maxLength={14}
                  required
                />
              </div>
            </section>

            <section className={Styles.formSection}>
              <h2>Dados do Pet</h2>

              <div className={Styles.field}>
                <label htmlFor="nomePet">Nome do pet</label>

                <input
                  id="nomePet"
                  name="nomePet"
                  type="text"
                  placeholder="Nome do animal"
                  value={nomePet}
                  onChange={(e) => setNomePet(e.target.value)}
                  required
                />
              </div>

              <div className={Styles.field}>
                <label htmlFor="especie">Espécie</label>

                <select
                  id="especie"
                  name="especie"
                  value={especie}
                  onChange={(e) => setEspecie(e.target.value)}
                  required
                >
                  <option value="">Selecione a espécie</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Roedor">Roedor</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className={Styles.field}>
                <label htmlFor="raca">Raça</label>

                <input
                  id="raca"
                  name="raca"
                  type="text"
                  placeholder="Raça do animal"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                  required
                />
              </div>

              <div className={Styles.field}>
                <label htmlFor="idade">Idade (em anos)</label>

                <input
                  id="idade"
                  name="idade"
                  type="number"
                  placeholder="Idade do animal"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  min="0"
                  max="100"
                  step="1"
                  required
                />
              </div>
            </section>
          </div>

          <div className={Styles.formActions}>
            <Link to="/" className={Styles.cancelButton}>
              Cancelar
            </Link>

            <button type="submit" className={Styles.submitButton}>
              Cadastrar cliente e pet
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
