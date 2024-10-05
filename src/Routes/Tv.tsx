import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTVshowsOnAir, ITVShow } from "../api";
import { makeImagePath } from "../utilities";

// icon
import RightArrowIcon from "../icon/right-arrow.svg";
import LeftArrowIcon from "../icon/left-arrow.svg";

// tv리스트 variants
const fadeVariants = {
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const Tv: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
                  <Title>{tv.name}</Title>
                  <Overview>
                    {tv.overview.length > 150
                      ? `${tv.overview.substring(0, 150)}...`
                      : tv.overview}
                  </Overview>
                </InfoText>
              </List>
            ))}
          </ListBox>
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
  padding: 0 2rem;
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
  margin-bottom: 1rem;
`;
const Overview = styled.p`
  letter-spacing: 1px;
  line-height: 1.8;
`;
