import React from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// icon
import XIcon from "../icon/X-mark.svg";

interface UserNavProps {
  setIsUserNavShow: (isVisible: boolean) => void;
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

const UserNav: React.FC<UserNavProps> = ({ setIsUserNavShow }) => {
  const navigate = useNavigate();

  const handleHiddenUserNav = () => {
    setIsUserNavShow(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsUserNavShow(false);
    navigate("/");
  };

  return (
    <Wrapper>
      <Nav
        initial="initial"
        animate="visible"
        exit="exit"
        variants={navVariants}
      >
        <CloseBtn onClick={handleHiddenUserNav}>
          <Icon src={XIcon} alt="x-icon" />
        </CloseBtn>
        <Ul>
          <Li>프로필관리</Li>
          <Li>계정</Li>
          <Li>고객센터</Li>
        </Ul>
        <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
      </Nav>
    </Wrapper>
  );
};

export default UserNav;

// style
const Wrapper = styled.div`
  position: relative;
`;
const Nav = styled(motion.nav)`
  width: 15vw;
  padding: 0.7rem;
  border-radius: 0.25rem;
  background-color: #fff;
  position: absolute;
  top: 2rem;
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
  color: #333;
  font-size: 0.8rem;
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const CloseBtn = styled.button``;
const Icon = styled.img`
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  &:hover {
    opacity: 0.7;
  }
`;
const LogoutBtn = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  color: #333;
  border-top: 1px solid ${theme.white.darker};
  &:hover {
    color: ${theme.red};
  }
`;
