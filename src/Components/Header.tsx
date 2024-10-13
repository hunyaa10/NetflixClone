import styled from "styled-components";
import LogoIcon from "../icon/logo.svg";
import SearchIcon from "../icon/search.svg";
import UserIcon from "../icon/user.svg";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import UserNav from "./UserNav";

// 헤더 애니메이션
const headerVariants = {
  top: {
    background: "linear-gradient(#000, transparent)",
  },
  scroll: {
    background: "linear-gradient(#000, #000)",
  },
};

// 검색창 애니메이션
const searchInputVariants = {
  open: {
    scaleX: 1,
    transition: { duration: 0.3, type: "linear" },
  },
  closed: {
    scaleX: 0,
    transition: { duration: 0.3, type: "linear" },
  },
};

const Header = () => {
  const navigate = useNavigate();
  // useRef로 input 지정
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [searchInputOpen, setSearchInputOpen] = useState(false);
  const [isUserNavShow, setIsUserNavShow] = useState(false);

  const { scrollY } = useScroll();

  const homeMatch = useMatch("home");
  const tvMatch = useMatch("tv");
  const pickMatch = useMatch("pick");
  const headerAnimation = useAnimation();

  // 영화검색함수
  const handleSearchMovie = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색입력값 지정
    const query = searchInputRef.current?.value;
    if (query) {
      navigate(`/search?query=${query}`);
    }
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleShowUserNav = () => {
    setIsUserNavShow(true);
  };

  const toggleSearch = () => {
    setSearchInputOpen((prev) => !prev);
  };

  useEffect(() => {
    const scrollHeader = scrollY.onChange(() => {
      if (scrollY.get() > 0) {
        headerAnimation.start("scroll");
      } else {
        headerAnimation.start("top");
      }
    });

    return () => scrollHeader();
  }, [scrollY]);

  return (
    <Nav variants={headerVariants} animate={headerAnimation} initial={"top"}>
      <Col>
        <Link to="home">
          <Logo src={LogoIcon} alt="logo" />
        </Link>
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
        <Search onSubmit={handleSearchMovie}>
          <SearchInput
            ref={searchInputRef}
            name="searchInput"
            placeholder="검색어를 입력하세요"
            variants={searchInputVariants}
            initial="closed"
            animate={searchInputOpen ? "open" : "closed"}
            value={inputValue}
            onChange={handleInputChange}
          />
          <SearchBtn type="submit">
            <SearchImg
              src={SearchIcon}
              alt="search-icon"
              onClick={toggleSearch}
            />
          </SearchBtn>
        </Search>
        <UserBtn src={UserIcon} onClick={handleShowUserNav} />
        {isUserNavShow && <UserNav setIsUserNavShow={setIsUserNavShow} />}
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
const Search = styled.form`
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
const SearchBtn = styled.button`
  width: fit-content;
`;
const SearchImg = styled(motion.img)`
  width: 24px;
  height: 24px;
`;
const UserBtn = styled.img`
  width: 1.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;
