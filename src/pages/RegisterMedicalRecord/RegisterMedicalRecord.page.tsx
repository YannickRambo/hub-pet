import { useState } from "react";
import Styles from "./RegisterMedicalRecord.module.css";

const initialForm = {
    anamnese: "",
    exameFisico: "",
    diagnostico: "",
    vacina: false,
    exames: false,
};

export default function RegisterMedicalRecord() {
    const [form, setForm] = useState(initialForm);

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function handlePrint() {
        window.print();
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Prontuário médico:", form);
    }

    return (
        <main className={Styles.page}>
            <section className={Styles.container}>
                <header className={Styles.heading}>
                    <h1>Prontuário Médico</h1>
                    <p>
                        Registre as informações clínicas do paciente.
                    </p>
                </header>

                <form
                    className={Styles.form}
                    onSubmit={handleSubmit}
                >
                    <div className={Styles.recordContent}>
                        <div className={Styles.textFields}>
                            <div className={Styles.field}>
                                <label htmlFor="anamnese">
                                    Anamnese
                                </label>

                                <textarea
                                    id="anamnese"
                                    name="anamnese"
                                    value={form.anamnese}
                                    onChange={handleChange}
                                    placeholder="Descreva o histórico clínico e os sintomas relatados..."
                                    rows={4}
                                />
                            </div>

                            <div className={Styles.field}>
                                <label htmlFor="exameFisico">
                                    Exame físico
                                </label>

                                <textarea
                                    id="exameFisico"
                                    name="exameFisico"
                                    value={form.exameFisico}
                                    onChange={handleChange}
                                    placeholder="Registre os achados do exame físico..."
                                    rows={4}
                                />
                            </div>

                            <div className={Styles.field}>
                                <label htmlFor="diagnostico">
                                    Diagnóstico
                                </label>

                                <textarea
                                    id="diagnostico"
                                    name="diagnostico"
                                    value={form.diagnostico}
                                    onChange={handleChange}
                                    placeholder="Informe o diagnóstico..."
                                    rows={4}
                                />
                            </div>
                        </div>

                        <aside className={Styles.options}>
                            <h2>Procedimentos</h2>

                            <label className={Styles.checkboxOption}>
                                <input
                                    type="checkbox"
                                    name="vacina"
                                    checked={form.vacina}
                                    onChange={handleChange}
                                />
                                <span>Vacina</span>
                            </label>

                            <label className={Styles.checkboxOption}>
                                <input
                                    type="checkbox"
                                    name="exames"
                                    checked={form.exames}
                                    onChange={handleChange}
                                />
                                <span>Exames</span>
                            </label>
                        </aside>
                    </div>

                    <footer className={Styles.actions}>
                        <button
                            type="button"
                            className={Styles.printButton}
                            onClick={handlePrint}
                        >
                            Imprimir
                        </button>

                        <button
                            type="submit"
                            className={Styles.saveButton}
                        >
                            Salvar
                        </button>
                    </footer>
                </form>
            </section>
        </main>
    );
}