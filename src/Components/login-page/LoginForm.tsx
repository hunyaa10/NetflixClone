import styled from "styled-components";
import { ChangeEvent, FormEvent, useState } from "react";
import LogoImg from "../../icon/logo.svg";
import { theme } from "../../theme";
interface InputValue {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleLogin: () => void;
}

const LoginForm = ({ handleLogin }: LoginFormProps) => {
  const [inputValue, setInputValue] = useState<InputValue>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <LoginWrapper>
      <Form onSubmit={handleLoginSubmit}>
        <LogoTitle src={LogoImg} alt="logo" />
        <Input
          type="email"
          name="email"
          placeholder="이메일을 아무거나 입력해주세요"
          required
          value={inputValue.email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 아무거나 입력해주세요"
          required
          value={inputValue.password}
          onChange={handleInputChange}
        />
        <LoginBtn type="submit">로그인</LoginBtn>
      </Form>
      <Text>
        타입스크립트를 공부하면서 만든 개인프로젝트입니다. <br />
        디자인은 넷플릭스 사이트를 참고하였습니다.
        <br />
        개발자: 하수현
        <br />
        이메일: hunyaa10@gmail.com
      </Text>
    </LoginWrapper>
  );
};

export default LoginForm;

// style
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const Form = styled.form`
  width: 30vw;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: ${theme.white.lighter};
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
  width: 80%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: ${theme.white.lighter};
  &:focus {
    outline: none;
    border: 1px solid "#328bc7";
  }
`;
const LoginBtn = styled.button`
  margin-top: 3rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${theme.red.original};
  color: ${theme.white.lighter};
  letter-spacing: 1px;
  font-weight: 600;
  opacity: 0.8;
  transition: 0.3s;
  &:hover {
    opacity: 1;
    transform: translateY(-4px);
  }
`;
const Text = styled.div`
  color: ${theme.white.darker};
  font-size: 1.2rem;
  text-align: center;
  line-height: 2;
`;
