import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../theme";

const HeaderMenu = () => {
  const homeMatch = useMatch("home");
  const tvMatch = useMatch("tv");
  const pickMatch = useMatch("pick");

  return (
    <MenuList>
      <Menu>
        <Link to="home">영화 {homeMatch && <Circle layoutId="circle" />}</Link>
      </Menu>
      <Menu>
        <Link to="tv">TV 시리즈 {tvMatch && <Circle layoutId="circle" />}</Link>
      </Menu>
      <Menu>
        <Link to="pick">
          내가 찜한 리스트 {pickMatch && <Circle layoutId="circle" />}
        </Link>
      </Menu>
    </MenuList>
  );
};

export default HeaderMenu;

// style
const MenuList = styled.ul`
  display: flex;
  align-items: center;
`;
const Menu = styled.li`
  position: relative;
  margin-right: 1.5rem;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: ${theme.red.original};
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: ${theme.red.original};
`;
