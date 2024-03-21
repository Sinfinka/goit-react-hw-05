import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../movies-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { createImgURL } from "../../misc";
import Loader from "../Loader/Loader";

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
  console.log("setReviews", reviews);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <div>
              <img
                src={createImgURL(review.author_details.avatar_path)}
                alt={`user avatar`}
              />
              <span>@{review.author}</span>

              <span>{review.content}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
