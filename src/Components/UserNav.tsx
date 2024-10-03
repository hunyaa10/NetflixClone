import React from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface UserNavProps {
  setIsNavShow: (isVisible: boolean) => void;
}

const navVariants = {
  initial: {
    x: 300,
  },
  visible: {
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    x: 300,
    transition: { duration: 0.3 },
  },
};

const UserNav: React.FC<UserNavProps> = ({ setIsNavShow }) => {
  const navigate = useNavigate();

  const handleHiddenUserNav = () => {
    setIsNavShow(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsNavShow(false);
    navigate("/");
  };

  return (
    <Nav initial="initial" animate="visible" exit="exit" variants={navVariants}>
      <Btn onClick={handleHiddenUserNav}>닫기</Btn>
      <Ul>
        <Li onClick={handleLogout}>로그아웃</Li>
      </Ul>
    </Nav>
  );
};

export default UserNav;

// style
const Nav = styled(motion.nav)`
  width: 20vw;
  height: 100vh;
  padding: 2rem 1rem;
  background-color: #000;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Ul = styled.ul`
  width: 100%;
`;
const Li = styled.li`
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid #525252;
  color: ${theme.white.darker};
  cursor: pointer;
  &:hover {
    color: ${theme.red};
  }
`;
const Btn = styled.button`
  margin-bottom: 2rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background-color: ${theme.red};
  color: ${theme.white.darker};
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.7;
  &:hover {
    opacity: 0.9;
  }
`;
