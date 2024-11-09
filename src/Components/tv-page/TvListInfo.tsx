import styled from "styled-components";
import { theme } from "../../theme";

import PlayIcon from "../../icon/play.svg";
import { TvSeries } from "../../api";

interface TvListInfoProps {
  tv: TvSeries;
  handleShowModal: (id: number) => void;
}

const TvListInfo = ({ tv, handleShowModal }: TvListInfoProps) => {
  return (
    <InfoText>
      <Title>{tv.name}</Title>
      <PlayBox>
        <PlayText>동영상 보러가기</PlayText>
        <PlayBtn onClick={() => handleShowModal(tv.id)}>
          <PlayBtnIcon src={PlayIcon} alt="play-icon" />
        </PlayBtn>
      </PlayBox>
      <Overview>
        {tv.overview.length > 150
          ? `${tv.overview.substring(0, 150)}...`
          : tv.overview}
      </Overview>
    </InfoText>
  );
};

export default TvListInfo;

// style
const InfoText = styled.div`
  width: 50%;
  position: absolute;
  bottom: 4rem;
  left: 3rem;
`;
const Title = styled.h1`
  font-size: 4vw;
`;
const PlayBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
const PlayBtn = styled.button`
  position: relative;
  z-index: 99;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const PlayBtnIcon = styled.img`
  width: 40px;
  height: 40px;
`;
const PlayText = styled.h4`
  color: ${(props) => theme.white.darker};
`;
const Overview = styled.p`
  margin-top: 0.5rem;
  letter-spacing: 1px;
  line-height: 1.8;
`;
