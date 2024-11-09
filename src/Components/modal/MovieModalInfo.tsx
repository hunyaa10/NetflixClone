import { useState } from "react";
import styled from "styled-components";
import { useLikedMovies } from "../../context/LikedMoviesContext";
import { IMovie } from "../../api";

import ThumbUpIcon from "../../icon/thumb-up.svg";
import ThumbDownIcon from "../../icon/thumb-down.svg";
import HeartIcon from "./HeartIcon";

interface MovieModalInfoProps {
  movieDetails: IMovie | undefined;
}

const MovieModalInfo = ({ movieDetails }: MovieModalInfoProps) => {
  const { addLikedMovie } = useLikedMovies();

  const [isFilled, setIsFilled] = useState(false);

  const onClickHeart = (movie: IMovie) => {
    setIsFilled(!isFilled);
    addLikedMovie(movie);
  };
  const handleAddLikedList = () => {
    if (movieDetails) {
      onClickHeart(movieDetails);
    }
  };
  return (
    <InfoNav>
      <InfoTitle>{movieDetails?.title}</InfoTitle>
      <InfoElements>
        <InfoBtns>
          <HeartIcon
            handleAddLikedList={handleAddLikedList}
            isFilled={isFilled}
          />
          <InfoBtn>
            <BtnIcon src={ThumbUpIcon} alt="thumbup" />
          </InfoBtn>
          <InfoBtn>
            <BtnIcon src={ThumbDownIcon} alt="thumbdown" />
          </InfoBtn>
        </InfoBtns>
        <InfoGenre>
          {movieDetails?.genres
            .slice(0, 3)
            .map((g) => g.name)
            .join(" • ")}
        </InfoGenre>
      </InfoElements>
    </InfoNav>
  );
};

export default MovieModalInfo;
// style
const InfoNav = styled.div`
  padding: 0.5rem 1rem;
`;
const InfoTitle = styled.h2``;
const InfoElements = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InfoBtns = styled.div`
  display: flex;
  align-items: center;
`;
const InfoBtn = styled.button`
  width: 32px;
  margin-right: 1rem;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const BtnIcon = styled.img`
  width: 100%;
`;
const InfoGenre = styled.div``;
