import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult } from "../../api";

import DoubleRight from "../../icon/double-right.svg";
import SliderRow from "./SliderRow";
import { theme } from "../../theme";

interface SliderProps {
  category: {
    queryFn: () => Promise<IGetMoviesResult>;
    title: string;
  };
}

const offset = 6;

const Slider = ({ category }: SliderProps) => {
  const [index, setIndex] = useState<number>(0);
  const [leaving, setLeaving] = useState<boolean>(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const { data, isLoading, isError } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", category.title],
    queryFn: category.queryFn,
  });

  const increaseIndex = (totalMovies: number) => {
    if (leaving) return;
    toggleLeaving();
    const maxIndex = Math.ceil(totalMovies / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <SliderWrapper>
      {isLoading || isError ? (
        <>
          {isLoading && <Loader>{category.title} 목록 로딩중...</Loader>}
          {isError && (
            <Error>
              {category.title} 목록을 로딩하는중 오류가 발생했습니다
            </Error>
          )}
        </>
      ) : (
        <SliderBox>
          <SliderTitle>{category.title}</SliderTitle>
          <SliderRow
            index={index}
            data={data}
            offset={offset}
            toggleLeaving={toggleLeaving}
          />
          <SliderBtn onClick={() => increaseIndex(data?.results.length || 0)}>
            <img src={DoubleRight} style={{ width: "32px" }} />
          </SliderBtn>
        </SliderBox>
      )}
    </SliderWrapper>
  );
};

export default Slider;

// style
const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${theme.white.darker};
`;
const Error = styled(Loader)`
  color: ${theme.red.original};
`;
const SliderWrapper = styled.div`
  margin-bottom: 180px;
`;
const SliderBox = styled.div`
  padding-left: 2rem;
  position: relative;
  top: -80px;
`;
const SliderTitle = styled.h4`
  padding: 0 0 1rem 1rem;
  color: ${theme.white.darker};
  font-size: 20px;
`;

const SliderBtn = styled.button`
  width: 40px;
  height: 160px;
  position: absolute;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
