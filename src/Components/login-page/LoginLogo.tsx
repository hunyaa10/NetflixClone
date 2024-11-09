import { motion } from "framer-motion";
import styled from "styled-components";

import LogoImg from "../../icon/logo.svg";

const logoVariants = {
  initial: { rotateY: 360, opacity: 0 },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 2, ease: "easeIn" },
  },
  exit: {
    rotateY: 360,
    opacity: 0,
    transition: { ease: "easeOut" },
  },
};

const LoginLogo = () => {
  return (
    <LogoWrapper>
      <LogoBox
        variants={logoVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Logo src={LogoImg} alt="logo" />
      </LogoBox>
    </LogoWrapper>
  );
};

export default LoginLogo;

// style
const LogoWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 9999;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoBox = styled(motion.h1)``;
const Logo = styled.img`
  width: 15vw;
`;
