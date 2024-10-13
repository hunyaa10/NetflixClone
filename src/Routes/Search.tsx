import { useLocation } from "react-router-dom";
import SearchMovies from "../Components/search-page/SearchMovies";

const Search: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  return <SearchMovies query={query} />;
};
export default Search;
