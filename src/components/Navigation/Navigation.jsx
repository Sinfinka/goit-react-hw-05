import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const addActiveClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header>
      {/* <div>
        <Link to="/">
          <IoIosPulse className={c.logo} size={40} />
        </Link>
      </div> */}
      <nav>
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
