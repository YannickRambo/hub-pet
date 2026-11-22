import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Styles from "./Schedule.module.css";
import {
  STATUS_SERVICO,
  getAgendamentos,
  statusDoAgendamento,
  updateStatusAgendamento,
  type Agendamento,
  type StatusServico,
} from "../../utils/storage";

const classePorStatus: Record<StatusServico, string> = {
  Agendado: Styles.statusAgendado,
  "Em andamento": Styles.statusAndamento,
  Concluído: Styles.statusConcluido,
  Cancelado: Styles.statusCancelado,
};

function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : iso;
}

export default function Schedule() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() =>
    getAgendamentos(),
  );
  const [busca, setBusca] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("Todos");

  const navigate = useNavigate();

  function handleStatusChange(id: number, novoStatus: StatusServico) {
    updateStatusAgendamento(id, novoStatus);
    setAgendamentos(getAgendamentos());
  }

  const termo = busca.trim().toLowerCase();

  const filtrados = agendamentos
    .filter((item) => {
      const combinaBusca =
        !termo ||
        item.cliente.toLowerCase().includes(termo) ||
        item.pet.toLowerCase().includes(termo) ||
        item.servico.toLowerCase().includes(termo);
      const combinaData = !data || item.data === data;
      const combinaStatus =
        status === "Todos" || statusDoAgendamento(item) === status;

      return combinaBusca && combinaData && combinaStatus;
    })
    .sort((a, b) =>
      `${a.data} ${a.horario}`.localeCompare(`${b.data} ${b.horario}`),
    );

  return (
    <main className={Styles.schedule}>
      <div className={Styles.heading}>
        <h1>Agenda de Serviços</h1>
        <div className={Styles.buttonsContainer}>
          <button
            type="button"
            className={Styles.backButton}
            onClick={() => navigate("/hub-pet")}
          >
            Voltar
          </button>
          <Link to="/hub-pet/agendamento" className={Styles.newButton}>
            Novo agendamento
          </Link>
        </div>
      </div>

      <section className={Styles.filters}>
        <div className={Styles.filterGroup}>
          <label htmlFor="busca">Pesquisar</label>
          <input
            type="search"
            id="busca"
            placeholder="Cliente, pet ou serviço..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>

        <div className={Styles.filterGroup}>
          <label htmlFor="filtroData">Data</label>
          <input
            type="date"
            id="filtroData"
            value={data}
            onChange={(event) => setData(event.target.value)}
          />
        </div>

        <div className={Styles.filterGroup}>
          <label htmlFor="filtroStatus">Status</label>
          <select
            id="filtroStatus"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="Todos">Todos</option>
            {STATUS_SERVICO.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      <p className={Styles.counter}>
        {filtrados.length} agendamento(s) encontrado(s)
      </p>

      <section className={Styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Horário</th>
              <th>Cliente</th>
              <th>Pet</th>
              <th>Serviço</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.length > 0 ? (
              filtrados.map((item) => {
                const statusAtual = statusDoAgendamento(item);

                return (
                  <tr key={item.id}>
                    <td>{formatarData(item.data)}</td>
                    <td>{item.horario}</td>
                    <td>{item.cliente}</td>
                    <td>{item.pet}</td>
                    <td>{item.servico}</td>
                    <td>
                      <select
                        className={`${Styles.statusSelect} ${classePorStatus[statusAtual]}`}
                        aria-label={`Status do serviço de ${item.pet}`}
                        value={statusAtual}
                        onChange={(event) =>
                          handleStatusChange(
                            item.id,
                            event.target.value as StatusServico,
                          )
                        }
                      >
                        {STATUS_SERVICO.map((opcao) => (
                          <option key={opcao} value={opcao}>
                            {opcao}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className={Styles.emptyMessage}>
                  {agendamentos.length === 0 ? (
                    <>
                      Nenhum serviço agendado ainda.{" "}
                      <Link to="/hub-pet/agendamento">Agendar um serviço</Link>
                    </>
                  ) : (
                    "Nenhum agendamento encontrado com esses filtros."
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
