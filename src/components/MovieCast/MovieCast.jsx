import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../movies-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import Loader from "../Loader/Loader";
import { createImgURL } from "../../misc";

function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchedData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchedData();
  }, [movieId]);

  console.log("cast", cast);

  return (
    <div>
      {isLoading && "<Loader />"}
      {error && <ErrorMessage />}

      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <div>
              {actor.profile_path && (
                <img src={createImgURL(actor.profile_path)} alt={actor.name} />
              )}
            </div>
            <div>
              <span>{actor.name}</span>
              <span>{actor.character}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
