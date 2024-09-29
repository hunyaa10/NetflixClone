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
}

const MovieSlider = () => {
  const categories: Category[] = [
    { queryFn: getMovies, title: "현재 상영중인 영화" },
    { queryFn: getMoviesTopRated, title: "높은 평점을 받은 영화" },
    { queryFn: getMoviesPopular, title: "인기있는 영화" },
    { queryFn: getMoviesUpcoming, title: "개봉예정인 영화" },
  ];

  return (
    <>
      {categories.map((category, index) => (
        <Slider key={index} category={category} />
      ))}
    </>
  );
};

export default MovieSlider;
