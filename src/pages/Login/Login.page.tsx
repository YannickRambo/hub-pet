import { useNavigate } from "react-router";
import Styles from "./Login.module.css";

export default function Login() {
    const navigate = useNavigate();

    return (
        <main className={Styles.login}>
            <form className={Styles.loginForm}>
                <h1>HubPet</h1>
                <div className={Styles.loginInput}>
                    <label htmlFor="">Usuário</label>
                    <input type="text" name="" id="" placeholder="Seu nome completo"/>
                </div>
                <div className={Styles.loginInput}>
                    <label htmlFor="">Senha</label>
                    <input type="password" name="" id=""/>
                </div>
                <div className={Styles.loginButton}>
                    <button onClick={() => navigate("/hub-pet")}>Entrar</button>
                    <a onClick={() => navigate("/forgot-password")}>Esqueci minha senha</a>
                </div>
            </form>
        </main>
    )
}