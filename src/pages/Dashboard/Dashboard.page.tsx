import Styles from "./Dashboard.module.css";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext.context";
import { dashboardCards } from "../../utils/dashboard-cards";

export default function Dashboard() {
    const { user } = useAuth();

    const dashboardUserCards: any[] = dashboardCards.filter(card => card.roles.includes(user.type));

    return (
        <div className={Styles.dashboard}>
            <main className={Styles.mainContent}>
                <section className={Styles.cardsGrid}>
                    {dashboardUserCards.map(card => (
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