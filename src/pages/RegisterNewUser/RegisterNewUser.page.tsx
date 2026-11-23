
import Styles from "./RegisterNewUser.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { users } from "../../utils/users";
import type { User } from "../../types/User";

export default function RegisterNewUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<User>({
        email: "",
        password: "",
        type: ""
    });

    function handleChange(event: any) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        users.push(formData);   
        
        alert("Usuário cadastrado com sucesso!");
    }

    return (
        <main className={Styles.registerUser}>
            <div className={Styles.pageHeading}>
                <h1>Cadastrar Usuário</h1>
            </div>
            <form
                className={Styles.registerUserForm}
                onSubmit={handleSubmit}
            >

                <div className={Styles.registerUserInput}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className={Styles.registerUserInput}>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        minLength={5}
                        required
                    />
                </div>

                <div className={Styles.registerUserInput}>
                    <label htmlFor="type">Tipo de usuário</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um perfil</option>
                        <option value="ADMIN">Administrador</option>
                        <option value="ATENDENTE">Atendente</option>
                        <option value="ESTOQUISTA">Estoquista</option>
                        <option value="VETERINARIO">Veterinário</option>
                    </select>
                </div>

                <div className={Styles.registerUserButton}>
                    <button type="submit">
                        Cadastrar usuário
                    </button>

                    <a
                        href="/"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("/");
                        }}
                    >
                        Voltar ao login
                    </a>
                </div>
            </form>
        </main>
    );
}
