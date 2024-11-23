import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginLogo from "./LoginLogo";
import LoginForm from "./LoginForm";

const LoginBox = () => {
  const navigate = useNavigate();

  const [isLogoVisible, setIsLogoVisible] = useState<boolean>(false);

  const handleLogin = () => {
    localStorage.setItem("isLogin", "1");
    setIsLogoVisible(true);
  };

  useEffect(() => {
    if (isLogoVisible) {
      const logoShow = setTimeout(() => {
        setIsLogoVisible(false);
        navigate("/home");
      }, 2000);
      // cleanup
      return () => clearTimeout(logoShow);
    }
  }, [isLogoVisible, navigate]);
  return (
    <Warrper>
      {isLogoVisible ? <LoginLogo /> : <LoginForm handleLogin={handleLogin} />}
    </Warrper>
  );
};

export default LoginBox;

//style
const Warrper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: relative;
  z-index: 9998;
`;
