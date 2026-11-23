import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Styles from "./RegisterNewService.module.css";
import {
  addAgendamento,
  getAgendamentos,
  getClientes,
  getPetsDoCliente,
  statusDoAgendamento,
  type Agendamento,
} from "../../utils/storage";

const HORARIOS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

// Retorna true quando a data/horário escolhidos já ficaram no passado
function horarioJaPassou(data: string, horario: string): boolean {
  if (!data || !horario) return false;
  return new Date(`${data}T${horario}:00`).getTime() <= Date.now();
}

export default function RegisterNewService() {
  const navigate = useNavigate();
  const [clientes] = useState(() => getClientes());
  const [clienteId, setClienteId] = useState("");
  const [pet, setPet] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (horarioJaPassou(data, horario)) {
      alert(
        "⚠️ Esse horário já passou. Escolha um horário a partir de agora.",
      );
      setHorario("");
      return;
    }

    const agendamentosSalvos = getAgendamentos();

    const conflito = agendamentosSalvos.find(
      (item) =>
        item.data === data &&
        item.horario === horario &&
        statusDoAgendamento(item) !== "Cancelado",
    );

    if (conflito) {
      alert(
        "⚠️ Horário indisponível! Já existe um agendamento marcado para esta data e horário.",
      );
      return;
    }

    const clienteSelecionado = clientes.find((item) => item.id === clienteId);

    const novoAgendamento: Agendamento = {
      id: Date.now(),
      cliente: clienteSelecionado?.nome ?? "",
      clienteId,
      pet,
      servico,
      data,
      horario,
      status: "Agendado",
    };

    addAgendamento(novoAgendamento);

    alert("Agendamento realizado com sucesso!");
    navigate("/hub-pet/agenda");
  }

  return (
    <main className={Styles.page}>
      <section className={Styles.container}>
        <header className={Styles.heading}>
          <h1>Agendar Serviço</h1>
        </header>

        <form className={Styles.form} onSubmit={handleSubmit}>
          <div className={Styles.clientPetFields}>
            <div className={Styles.field}>
              <label htmlFor="cliente">Buscar Cliente</label>

              <select
                id="cliente"
                value={clienteId}
                onChange={(event) => {
                  setClienteId(event.target.value);
                  setPet("");
                }}
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                ))}
              </select>

              {clientes.length === 0 && (
                <small>
                  Nenhum cliente cadastrado ainda.{" "}
                  <Link to="/hub-pet/clientes/novo">
                    Cadastre um cliente e pet
                  </Link>
                  .
                </small>
              )}
            </div>

            <div className={Styles.field}>
              <label htmlFor="pet">Buscar Pet</label>

              <select
                id="pet"
                value={pet}
                onChange={(event) => setPet(event.target.value)}
                disabled={!clienteId}
                required
              >
                <option value="">
                  {clienteId ? "Selecione um pet" : "Selecione um cliente primeiro"}
                </option>
                {getPetsDoCliente(clienteId).map((item) => (
                  <option key={item.nome} value={item.nome}>
                    {item.nome} ({item.especie})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={Styles.serviceField}>
            <div className={Styles.field}>
              <label htmlFor="servico">Buscar Serviço</label>

              <select
                id="servico"
                value={servico}
                onChange={(event) => setServico(event.target.value)}
                required
              >
                <option value="">Selecione um serviço</option>
                <option value="Banho">Banho</option>
                <option value="Tosa">Tosa</option>
                <option value="Banho e tosa">Banho e tosa</option>
                <option value="Consulta veterinária">
                  Consulta veterinária
                </option>
              </select>
            </div>
          </div>

          <section className={Styles.calendarSection}>
            <h2>Data e horário do agendamento</h2>

            <div className={Styles.calendarFields}>
              <div className={Styles.field}>
                <label htmlFor="data">Data</label>

                <input
                  id="data"
                  type="date"
                  value={data}
                  onChange={(event) => {
                    const novaData = event.target.value;
                    setData(novaData);
                    if (horarioJaPassou(novaData, horario)) setHorario("");
                  }}
                  min={new Date().toLocaleDateString("en-CA")}
                  required
                />
              </div>

              <div className={Styles.field}>
                <label htmlFor="horario">Horário</label>

                <select
                  id="horario"
                  value={horario}
                  onChange={(event) => setHorario(event.target.value)}
                  required
                >
                  <option value="">Selecione um horário</option>
                  {HORARIOS.map((hora) => {
                    const passou = horarioJaPassou(data, hora);

                    return (
                      <option key={hora} value={hora} disabled={passou}>
                        {hora}
                        {passou ? " (indisponível)" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </section>

          <footer className={Styles.actions}>
            <Link to="/hub-pet" className={Styles.cancelButton}>
              Cancelar
            </Link>

            <button type="submit" className={Styles.confirmButton}>
              Confirmar agendamento
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
