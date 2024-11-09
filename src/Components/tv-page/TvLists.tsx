import { motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../../utilities";
import { ITVShow } from "../../api";
import TvListInfo from "./TvListInfo";

interface TvListsProps {
  data: ITVShow | undefined;
  currentIndex: number;
  handleShowModal: (id: number) => void;
}

const fadeVariants = {
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const TvLists = ({ data, currentIndex, handleShowModal }: TvListsProps) => {
  return (
    <ListBox>
      {data?.results.map((tv, idx) => (
        <List
          key={tv.id}
          $bgimg={makeImagePath(tv.backdrop_path)}
          variants={fadeVariants}
          initial="exit"
          animate={idx === currentIndex ? "enter" : "exit"}
        >
          <TvListInfo tv={tv} handleShowModal={handleShowModal} />
        </List>
      ))}
    </ListBox>
  );
};

export default TvLists;

// style
const ListBox = styled.div`
  position: relative;
`;
const List = styled(motion.div)<{ $bgimg: string }>`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.$bgimg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
`;
