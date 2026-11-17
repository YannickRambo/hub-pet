import { useNavigate } from "react-router";
import Styles from "./Login.module.css";

export default function Login() {
    const navigate = useNavigate();

    return (
        <main className={Styles.login}>
            <form className={Styles.loginForm}>
                <h1>HubPet - Login</h1>
                <div className={Styles.loginInput}>
                    <h3>Usuário</h3>
                    <input type="text" name="" id="" />
                </div>
                <div className={Styles.loginInput}>
                    <h3>Senha</h3>
                    <input type="text" name="" id="" />
                </div>
                <div className={Styles.loginButton}>
                    <button onClick={() => navigate("/hub-pet")}>Entrar</button>
                    <a onClick={() => navigate("/forgot-password")}>Esqueci minha senha</a>
                </div>
            </form>
        </main>
    )
}