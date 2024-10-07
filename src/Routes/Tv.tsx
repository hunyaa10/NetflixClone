import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTVshowsOnAir, getTVshowsVideos, ITVShow } from "../api";
import { makeImagePath } from "../utilities";
import TVModal from "../Components/modal/TVModal";

// icon
import RightArrowIcon from "../icon/right-arrow.svg";
import LeftArrowIcon from "../icon/left-arrow.svg";
import PlayIcon from "../icon/play.svg";
import { theme } from "../theme";

// tv리스트 variants
const fadeVariants = {
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const Tv: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTVModal, setIsTVModal] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // 티비시리즈 데이터
  const { data, isLoading } = useQuery<ITVShow>({
    queryKey: ["tvShows", "onAir"],
    queryFn: getTVshowsOnAir,
  });

  // tv리스트 애니메이션
  const clickSlideMotion = (direction: "left" | "right") => {
    setCurrentIndex((prev) => {
      const totalLists = data?.results.length || 0;
      if (direction === "left") {
        return prev === 0 ? totalLists - 1 : prev - 1;
      } else {
        return prev === totalLists - 1 ? 0 : prev + 1;
      }
    });
  };

  // 예고편모달창
  const handleShowModal = async (tvId: number) => {
    const videoData = await getTVshowsVideos(tvId);
    if (videoData.results.length > 0) {
      setVideoUrl(videoData.results[0].key);
      setIsTVModal(true);
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Banner>
          {/* {console.log(data)} */}
          <ArrowBtnBox>
            <BtnIcon
              src={LeftArrowIcon}
              alt="left-arrow"
              onClick={() => clickSlideMotion("left")}
            />
            <BtnIcon
              src={RightArrowIcon}
              alt="right-arrow"
              onClick={() => clickSlideMotion("right")}
            />
          </ArrowBtnBox>
          <ListBox>
            {data?.results.map((tv, idx) => (
              <List
                key={tv.id}
                bgImg={makeImagePath(tv.backdrop_path)}
                variants={fadeVariants}
                initial="exit"
                animate={idx === currentIndex ? "enter" : "eixt"}
              >
                <InfoText>
                  {/* <p>{tv.id}</p> */}
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
              </List>
            ))}
          </ListBox>
          {/* 모달창 */}
          {isTVModal && (
            <TVModal setIsTVModal={setIsTVModal} videoUrl={videoUrl} />
          )}
        </Banner>
      )}
    </Wrapper>
  );
};
export default Tv;

// style
const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const Wrapper = styled.div``;

const Banner = styled.div`
  position: relative;
`;

const ArrowBtnBox = styled.div`
  width: 100%;
  margin-top: 50vh;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 999;
`;
const BtnIcon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
  }
`;

const ListBox = styled.div`
  position: relative;
`;
const List = styled(motion.div)<{ bgImg: string }>`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
`;
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
