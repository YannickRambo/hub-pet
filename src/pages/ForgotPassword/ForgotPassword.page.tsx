
import Styles from "./ForgotPassword.module.css";
import { Link } from "react-router";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        console.log("Solicitação de recuperação:", email);
    }

    return (
        <main className={Styles.forgotPassword}>
            <form
                className={Styles.forgotPasswordForm}
                onSubmit={handleSubmit}
            >
                <h1>HubPet</h1>
                <h2>Esqueci minha senha</h2>

                <p>
                    Informe seu e-mail cadastrado para solicitar
                    a recuperação da sua senha.
                </p>

                <div className={Styles.forgotPasswordInput}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className={Styles.forgotPasswordButton}>
                    <button type="submit">
                        Recuperar senha
                    </button>

                    <Link to="/">Voltar ao login</Link>
                </div>
            </form>
        </main>
    );
}
