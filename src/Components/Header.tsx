import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import HeaderMenu from "./header/HeaderMenu";
import HeaderSearch from "./header/HeaderSearch";
import HeaderUser from "./header/HeaderUser";

import LogoIcon from "../icon/logo.svg";

const headerVariants = {
  top: {
    background: "linear-gradient(#000, transparent)",
  },
  scroll: {
    background: "linear-gradient(#000, #000)",
  },
};

const Header = () => {
  const { scrollY } = useScroll();
  const headerAnimation = useAnimation();

  useEffect(() => {
    const handleScrollHeader = (latestY: number) => {
      if (latestY > 0) {
        headerAnimation.start("scroll");
      } else {
        headerAnimation.start("top");
      }
    };

    const unsubscribe = scrollY.on("change", handleScrollHeader);

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  return (
    <Nav variants={headerVariants} animate={headerAnimation} initial={"top"}>
      <Col>
        <Link to="home">
          <Logo src={LogoIcon} alt="logo" />
        </Link>
        <HeaderMenu />
      </Col>
      <Col>
        <HeaderSearch />
        <HeaderUser />
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
  color: #fff;
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
