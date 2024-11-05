import {
  getMovies,
  getMoviesPopular,
  getMoviesTopRated,
  getMoviesUpcoming,
  IGetMoviesResult,
} from "../../api";
import Slider from "./Slider";

interface Category {
  queryFn: () => Promise<IGetMoviesResult>;
  title: string;
  id: string;
}

const MovieSlider = () => {
  const categories: Category[] = [
    { queryFn: getMovies, title: "현재 상영중인 영화", id: "nowPlaying" },
    {
      queryFn: getMoviesTopRated,
      title: "높은 평점을 받은 영화",
      id: "topRated",
    },
    { queryFn: getMoviesPopular, title: "인기있는 영화", id: "popular" },
    { queryFn: getMoviesUpcoming, title: "개봉예정인 영화", id: "upcoming" },
  ];

  return (
    <>
      {categories.map((category) => (
        <Slider key={category.id} category={category} />
      ))}
    </>
  );
};

export default MovieSlider;
