import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => (
    <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
            Home
        </NavLink>

        <NavLink to="/movies" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
            Movies
        </NavLink>
    </nav>
);

export default Navigation;