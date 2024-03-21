import { createImgURL } from "../../misc";
import css from "./MovieItem.module.css";
import { TiStarFullOutline } from "react-icons/ti";

function MovieItem({ movie }) {
  return (
    <div>
      <p className={css.movieName}> {movie.title}</p>

      <p className={css.movieVote}>
        {" "}
        <TiStarFullOutline className={css.star} /> {movie.vote_average}
      </p>
      <img
        src={createImgURL(movie.poster_path)}
        alt={`${movie.title} poster`}
      />
    </div>
  );
}
export default MovieItem;
