import { useEffect, useState } from "react";
import { fetchData } from "../../movies-api";
import SearchBar from "../../components/SearchBar/Search.Bar";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
// import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const query = searchParams.get("query") || "";
        const data = await fetchData(query, page);
        setMovies(data.results);
        setPageInfo(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams, page]);

  const handleSearch = (values) => {
    setSearchParams(values);
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
      <h1>Movie Search:</h1>
      <h2>Find your favorite films easily and quickly</h2>

      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length === 0 && !loading && searchParams.get("query") && (
        <p>No movies found. Please try a different search.</p>
      )}
      {movies.length > 0 && (
        <Pagination
          page={page}
          pageInfo={pageInfo}
          onClickNext={handleGoNextPage}
          onClickPrev={handleGoPrevPage}
        />
      )}
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
