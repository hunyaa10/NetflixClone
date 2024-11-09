import styled from "styled-components";

import RightArrowIcon from "../../icon/right-arrow.svg";
import LeftArrowIcon from "../../icon/left-arrow.svg";

interface ArrowBtnProps {
  clickSlideMotion: (direction: "left" | "right") => void;
}

const ArrowBtn = ({ clickSlideMotion }: ArrowBtnProps) => {
  return (
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
  );
};

export default ArrowBtn;

// style
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
