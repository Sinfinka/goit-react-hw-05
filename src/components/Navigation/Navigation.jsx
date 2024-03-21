import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import { SiKinopoisk } from "react-icons/si";

const addActiveClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <div>
        <Link to="/" className={css.logo}>
          CINEMA <SiKinopoisk />
        </Link>
      </div>
      <nav className={css.nav}>
        <NavLink className={addActiveClass} to="/">
          Home
        </NavLink>
        <NavLink className={addActiveClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
