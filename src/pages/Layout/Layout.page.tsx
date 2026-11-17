import Styles from "./Layout.module.css";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <header className={Styles.layoutHeader}>
                <h2>HubPet</h2>
            </header>
            <Outlet />
        </>
    );
}