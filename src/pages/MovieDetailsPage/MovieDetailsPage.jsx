import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieData } from "../../movies-api";
import { createImgURL } from "../../misc";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import Loader from "../../components/Loader/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

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
      <Link to={backLinkRef.current} className={css.goBackLink}>
        <IoMdArrowRoundBack className={css.arrow} />
        Go back
      </Link>
      <div className={css.wrapper}>
        <img
          src={createImgURL(movie?.poster_path)}
          alt={`${movie?.title} poster`}
        />
        <div className={css.description}>
          <h1 className={css.header}>{movie?.title}</h1>
          <p>{movie?.overview}</p>
          <p>Rating: {movie?.vote_average}</p>
          <p>Release: {movie?.release_date}</p>
        </div>
      </div>

      <nav className={css.navigation}>
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback={"<Loader />"}>
        <Outlet />
      </Suspense>
    </div>
  );
}
