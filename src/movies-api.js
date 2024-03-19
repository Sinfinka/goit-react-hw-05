import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI5OTQ2ZGEwNTU3NDQ0MGQ4MDMwZjNmNDFkYjYzNiIsInN1YiI6IjY1ZjMzYTdmNDcwZWFkMDE0NzljM2I3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9RFKWEzDk6kyf1mmlkrHBhuxI_294eSuSuSuDCWUpn8";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers["Authorization"] = "Bearer " + API_TOKEN;

export default async function fetchData(newQuery, page) {
  const response = await axios.get("search/movie", {
    params: {
      query: newQuery,
      language: "en-US",
      page,
    },
  });
  console.log("response", response);
  return response.data;
}
