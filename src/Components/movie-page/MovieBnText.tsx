import styled from "styled-components";

import ThumbUpIcon from "../../icon/thumb-up.svg";
import ThumbDownIcon from "../../icon/thumb-down.svg";
import PlayIcon from "../../icon/play.svg";
import { IGetMoviesResult } from "../../api";

interface MovieBnTextProps {
  nowPlayingData: IGetMoviesResult | undefined;
  onPlayIconClick: () => void;
}

const MovieBnText = ({ nowPlayingData, onPlayIconClick }: MovieBnTextProps) => {
  return (
    <BannerText>
      <Title>{nowPlayingData?.results[0].title}</Title>
      <Overview>
        {nowPlayingData?.results[0]?.overview &&
        nowPlayingData.results[0].overview.length > 150
          ? `${nowPlayingData.results[0].overview.substring(0, 150)}...`
          : nowPlayingData?.results[0]?.overview}
      </Overview>
      <InfoBtns>
        <InfoBtn src={PlayIcon} onClick={onPlayIconClick} />
        <InfoBtn src={ThumbUpIcon} />
        <InfoBtn src={ThumbDownIcon} />
      </InfoBtns>
    </BannerText>
  );
};

export default MovieBnText;

// style
const BannerText = styled.div`
  width: 50%;
  flex-direction: column;
  position: relative;
  top: 50%;
  left: 3rem;
`;
const Title = styled.h1`
  font-size: 4vw;
`;
const Overview = styled.p`
  margin: 0.5rem 0;
  letter-spacing: 1px;
  line-height: 1.8;
`;
const InfoBtns = styled.div`
  display: flex;
`;
const InfoBtn = styled.img`
  width: 32px;
  margin-right: 1rem;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
