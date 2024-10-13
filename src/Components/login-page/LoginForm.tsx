import { motion } from "framer-motion";
import styled from "styled-components";
// img
import LogoImg from "../../icon/logo.svg";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// 로고 애니메이션
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

interface InputValue {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<InputValue>({
    email: "",
    password: "",
  });

  const [isLogoVisible, setIsLogoVisible] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = () => {
    localStorage.setItem("isLogin", "1");
    setIsLogoVisible(true);
  };

  // 로그인 성공 시 로고 애니메이션 후 Home으로 이동
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
      {isLogoVisible ? (
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
      ) : (
        <Form onSubmit={handleLoginSubmit}>
          <LogoTitle src={LogoImg} alt="logo" />
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            required
            value={inputValue.email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            required
            value={inputValue.password}
            onChange={handleInputChange}
          />
          <LoginBtn type="submit">로그인</LoginBtn>
          <Text>아직 넷플릭스 회원이 아니신가요?</Text>
        </Form>
      )}
    </Warrper>
  );
};

export default LoginForm;

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
const Form = styled.form`
  width: 30%;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoTitle = styled.img`
  width: 10vw;
  margin-bottom: 2rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  &:focus {
    outline: none;
    border: 1px solid "#328bc7";
  }
`;
const LoginBtn = styled.button`
  margin-top: 3rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #e51014dd;
  color: #fff;
  letter-spacing: 1px;
  font-weight: 600;
  &:hover {
    background-color: #e51014;
  }
`;
const Text = styled.p`
  margin-top: 1rem;
  color: #333;
`;

// 로고 애니매이션css
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
