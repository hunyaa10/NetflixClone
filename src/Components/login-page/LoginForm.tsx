import styled from "styled-components";
import { ChangeEvent, FormEvent, useState } from "react";
import LogoImg from "../../icon/logo.svg";
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
      <Text>아직 넷플릭스 회원이 아니신가요?</Text>
    </Form>
  );
};

export default LoginForm;

// style
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
