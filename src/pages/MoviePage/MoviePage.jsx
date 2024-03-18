import { useEffect, useState } from "react";
import fetchData from "../../movies-api";
import SearchBar from "../../components/SearchBar/Search.Bar";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (newQuery) => {
    try {
      setLoading(true);
      setMovies([]);
      const data = await fetchData(newQuery);
      setMovies(data);
      console.log(newQuery);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(movies);

  return (
    <div>
      <h2>Movies Page</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading</p>}
    </div>
  );
};

export default MoviesPage;

// useEffect(() => {
//   async function getData() {
//     try {
//       const data = await fetchData();
//       setMovies(data);
//     } catch (error) {
//       console.log("error");
//     }
//   }
//   getData();
// }, []);
