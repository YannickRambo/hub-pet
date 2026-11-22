import Styles from "./Layout.module.css";
import { navigationLinks } from "../../utils/navigation-links";
import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext.context";

export default function Layout() {
    const { user } = useAuth();

    const navigationsUserLinks = navigationLinks.filter(link => link.roles.includes(user.type));

    return (
        <div className={Styles.layout}>
            <header className={Styles.layoutHeader}>
                <h2>{user.type}</h2>
            </header>
            <aside className={Styles.sidebar}>
                <nav className={Styles.navigation}>
                    {navigationsUserLinks.map(link => (
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