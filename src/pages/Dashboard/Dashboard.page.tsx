import Styles from "./Dashboard.module.css";
import { Link } from "react-router";
import { dashboardCards } from "../../utils/dashboard-cards";

export default function Dashboard() {
    return (
        <div className={Styles.dashboard}>
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