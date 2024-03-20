import { Link } from "react-router-dom";
import MovieItem from "../MovieItem/MovieItem";

const MovieList = ({ movies }) => {
  console.log("movies in movie item", movies);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <MovieItem movie={movie} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
