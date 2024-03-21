import { useEffect, useState } from "react";
import { fetchTrendData } from "./../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTrendMovie() {
      try {
        setError(false);
        setLoading(true);
        const trendMovie = await fetchTrendData();

        setData(trendMovie.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getTrendMovie();
  }, []);

  return (
    <div>
      <h1>Today&apos;s most popular movies.</h1>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {data && <MovieList movies={data} />}
    </div>
  );
};

export default HomePage;
