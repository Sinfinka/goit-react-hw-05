import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../movies-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { createImgURL } from "../../misc";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchedData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchedData();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <div className={css.wrapper}>
                <img
                  className={css.avatar}
                  src={createImgURL(review.author_details.avatar_path)}
                  alt={`user avatar`}
                />
              </div>
              <div className={css.name}>@{review.author}</div>
              <div>{review.content}</div>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && !isLoading && <p>No reviews found.</p>}
    </div>
  );
}

export default MovieReviews;
