import { Link, useLocation } from "react-router-dom";
import MovieItem from "../MovieItem/MovieItem";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.listItem}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <MovieItem movie={movie} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
