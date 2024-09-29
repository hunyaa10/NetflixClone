import styled from "styled-components";
import LogoIcon from "../icon/logo.svg";
import SearchIcon from "../icon/search.svg";
import UserIcon from "../icon/user.svg";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";

const navVariants = {
  top: {
    background: "linear-gradient(#000, transparent)",
  },
  scroll: {
    background: "linear-gradient(#000, #000)",
  },
};

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();

  const homeMatch = useMatch("home");
  const tvMatch = useMatch("tv");
  const pickMatch = useMatch("pick");
  const navAnimation = useAnimation();

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    const scrollHeader = scrollY.onChange(() => {
      if (scrollY.get() > 0) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });

    return () => scrollHeader();
  }, [scrollY]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo src={LogoIcon} alt="logo" />
        <MenuList>
          <Menu>
            <Link to="home">
              영화 {homeMatch && <Circle layoutId="circle" />}
            </Link>
          </Menu>
          <Menu>
            <Link to="tv">
              TV 시리즈 {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Menu>
          <Menu>
            <Link to="pick">
              내가 찜한 리스트 {pickMatch && <Circle layoutId="circle" />}
            </Link>
          </Menu>
        </MenuList>
      </Col>
      <Col>
        <Search>
          <SearchInput
            placeholder="검색어를 입력하세요"
            animate={{
              scaleX: searchOpen ? 1 : 0,
              // display: searchOpen ? "block" : "none",
            }}
            transition={{ type: "linear" }}
          />
          <motion.img
            onClick={toggleSearch}
            src={SearchIcon}
            alt="search-icon"
            style={{ width: "24px" }}
          />
        </Search>
        <LoginBtn src={UserIcon} />
      </Col>
    </Nav>
  );
};

export default Header;

// style
const Nav = styled(motion.nav)`
  width: 100%;
  padding: 1.3rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  color: white;
  z-index: 997;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  margin-right: 2rem;
  width: 100px;
`;
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
    color: ${(props) => props.theme.red};
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.red};
`;
const Search = styled.div`
  margin-right: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;
const SearchInput = styled(motion.input)`
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  transform-origin: right center;
  border: 1px solid #6b6b6b;
  border-radius: 0.25rem;
  background-color: #222;
  color: #fff;
  /* display: none; */
`;
const LoginBtn = styled.img`
  width: 1.5rem;
  margin-left: 2rem;
  cursor: pointer;
`;
