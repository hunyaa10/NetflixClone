import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTVshowsOnAir, getTVshowsVideos, ITVShow } from "../../api";
import TVModal from "../modal/TVModal";
import styled from "styled-components";
import ArrowBtn from "./ArrowBtn";
import TvLists from "./TvLists";

const TvShow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTVModal, setIsTVModal] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const { data, isLoading } = useQuery<ITVShow | undefined>({
    queryKey: ["tvShows", "onAir"],
    queryFn: getTVshowsOnAir,
  });

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
          <ArrowBtn clickSlideMotion={clickSlideMotion} />
          <TvLists
            data={data}
            currentIndex={currentIndex}
            handleShowModal={handleShowModal}
          />
          {/* 모달창 */}
          {isTVModal && (
            <TVModal setIsTVModal={setIsTVModal} videoUrl={videoUrl} />
          )}
        </Banner>
      )}
    </Wrapper>
  );
};

export default TvShow;

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
