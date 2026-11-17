import Styles from "./Layout.module.css";
import { navigationLinks } from "../../utils/navigation-links";
import { NavLink, Outlet } from "react-router";

export default function Layout() {
    return (
        <div className={Styles.layout}>
            <header className={Styles.layoutHeader}>
                <h2>HubPet</h2>
            </header>
            <aside className={Styles.sidebar}>
                <nav className={Styles.navigation}>
                    {navigationLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                isActive
                                    ? `${Styles.navLink} ${Styles.active}`
                                    : Styles.navLink
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <main className={Styles.content}>
                <Outlet />
            </main>
        </div>
    );
}