import { useState } from "react";
import { Link } from "react-router";
import Styles from "./RegisterNewService.module.css";

export default function RegisterNewService() {
    const [cliente, setCliente] = useState("");
    const [pet, setPet] = useState("");
    const [servico, setServico] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const agendamento = {
            cliente,
            pet,
            servico,
            data,
            horario,
        };

        console.log("Agendamento:", agendamento);
    }

    return (
        <main className={Styles.page}>
            <section className={Styles.container}>
                <header className={Styles.heading}>
                    <h1>Agendar Serviço</h1>
                    <p>
                        Selecione o cliente, o pet, o serviço e
                        a data desejada.
                    </p>
                </header>

                <form
                    className={Styles.form}
                    onSubmit={handleSubmit}
                >
                    <div className={Styles.clientPetFields}>
                        <div className={Styles.field}>
                            <label htmlFor="cliente">
                                Buscar Cliente
                            </label>

                            <select
                                id="cliente"
                                value={cliente}
                                onChange={(event) =>
                                    setCliente(event.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Selecione um cliente
                                </option>
                                <option value="1">
                                    João Silva
                                </option>
                                <option value="2">
                                    Maria Oliveira
                                </option>
                                <option value="3">
                                    Pedro Santos
                                </option>
                            </select>
                        </div>

                        <div className={Styles.field}>
                            <label htmlFor="pet">
                                Buscar Pet
                            </label>

                            <select
                                id="pet"
                                value={pet}
                                onChange={(event) =>
                                    setPet(event.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Selecione um pet
                                </option>
                                <option value="1">
                                    Rex
                                </option>
                                <option value="2">
                                    Mel
                                </option>
                                <option value="3">
                                    Luna
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className={Styles.serviceField}>
                        <div className={Styles.field}>
                            <label htmlFor="servico">
                                Buscar Serviço
                            </label>

                            <select
                                id="servico"
                                value={servico}
                                onChange={(event) =>
                                    setServico(event.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Selecione um serviço
                                </option>
                                <option value="1">
                                    Banho
                                </option>
                                <option value="2">
                                    Tosa
                                </option>
                                <option value="3">
                                    Banho e tosa
                                </option>
                                <option value="4">
                                    Consulta veterinária
                                </option>
                            </select>
                        </div>
                    </div>

                    <section className={Styles.calendarSection}>
                        <h2>Data e horário do agendamento</h2>

                        <div className={Styles.calendarFields}>
                            <div className={Styles.field}>
                                <label htmlFor="data">
                                    Data
                                </label>

                                <input
                                    id="data"
                                    type="date"
                                    value={data}
                                    onChange={(event) =>
                                        setData(event.target.value)
                                    }
                                    min={
                                        new Date()
                                            .toLocaleDateString("en-CA")
                                    }
                                    required
                                />
                            </div>

                            <div className={Styles.field}>
                                <label htmlFor="horario">
                                    Horário
                                </label>

                                <select
                                    id="horario"
                                    value={horario}
                                    onChange={(event) =>
                                        setHorario(event.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Selecione um horário
                                    </option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <footer className={Styles.actions}>
                        <Link
                            to="/"
                            className={Styles.cancelButton}
                        >
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            className={Styles.confirmButton}
                        >
                            Confirmar agendamento
                        </button>
                    </footer>
                </form>
            </section>
        </main>
    );
}