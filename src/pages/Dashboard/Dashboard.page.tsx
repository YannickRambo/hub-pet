import Styles from "./Dashboard.module.css";
import { Link, NavLink } from "react-router";
import { navigationLinks } from "../../utils/navigation-links";
import { dashboardCards } from "../../utils/dashboard-cards";

export default function Dashboard() {
    return (
        <div className={Styles.dashboard}>
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

            <main className={Styles.mainContent}>
                <section className={Styles.cardsGrid}>
                    {dashboardCards.map(card => (
                        <Link
                            key={card.to}
                            to={card.to}
                            className={Styles.card}
                        >
                            <h2>{card.title}</h2>
                            <p>{card.description}</p>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}