import { useQuery } from "@tanstack/react-query";
import { getMovieVideos, IGetMovieVideosResult } from "../../api";
import styled from "styled-components";

interface MovieModalTrailerProps {
  movieId: number | undefined;
}

const MovieModalTrailer = ({ movieId }: MovieModalTrailerProps) => {
  const { data: movieVideos, isLoading } = useQuery<
    IGetMovieVideosResult | undefined
  >({
    queryKey: ["movieVideos", movieId],
    queryFn: () =>
      movieId ? getMovieVideos(movieId) : Promise.resolve(undefined),
    enabled: movieId !== undefined,
  });

  return (
    <VideoTrailer>
      {isLoading
        ? "유투브 연결중..."
        : movieVideos &&
          movieVideos.results.length > 0 && (
            <VideoFrame
              key={movieVideos.results[0].id}
              src={`https://www.youtube.com/embed/${movieVideos.results[0].key}`}
              title={movieVideos.results[0].name}
              allowFullScreen
            />
          )}
    </VideoTrailer>
  );
};

export default MovieModalTrailer;
// style
const VideoTrailer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;
const VideoFrame = styled.iframe`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border: none;
`;
