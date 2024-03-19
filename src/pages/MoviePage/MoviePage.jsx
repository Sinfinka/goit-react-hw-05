import { useEffect, useState } from "react";
import fetchData from "../../movies-api";
import SearchBar from "../../components/SearchBar/Search.Bar";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/loader/Loader";
import Pagination from "./../../components/Pagination/Pagination";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getData() {
      try {
        setError(false);
        setLoading(true);
        setMovies([]);
        const data = await fetchData(query, page);
        setMovies(data.results);
        setPageInfo(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [query, page]);

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleGoNextPage = () => {
    setPage(page + 1);
  };

  const handleGoPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Movie Search: </h1>
      <h2>Find your favorite films easily and quickly </h2>

      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length > 0 && (
        <Pagination
          page={page}
          pageInfo={pageInfo}
          onClickNext={handleGoNextPage}
          onClickPrev={handleGoPrevPage}
        />
      )}
    </div>
  );
};

export default MoviesPage;
