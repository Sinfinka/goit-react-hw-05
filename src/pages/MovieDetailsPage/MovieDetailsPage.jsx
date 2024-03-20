import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovieData } from "../../movies-api";
import { createImgURL } from "../../misc";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log("movie by id", movie);

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMovieData(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById();
  }, [movieId]);

  if (!movie) {
    return;
  }

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div>
        <img
          src={createImgURL(movie?.poster_path)}
          alt={`${movie?.title} poster`}
        />
        <h1>{movie?.title}</h1>
        <p>{movie?.overview}</p>
        <p>Rating: {movie?.vote_average}</p>
        <p>Release: {movie?.release_date}</p>
      </div>

      <nav>
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
