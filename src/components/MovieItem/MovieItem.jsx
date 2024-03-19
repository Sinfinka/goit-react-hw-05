import { createImgURL } from "../../misc";

function MovieItem({ movie }) {
  return (
    <div>
      <p>{movie.title}</p>
      <p>{movie.vote_average}</p>
      <img
        src={createImgURL(movie.poster_path)}
        alt={`${movie.title} poster`}
      />
    </div>
  );
}
export default MovieItem;
