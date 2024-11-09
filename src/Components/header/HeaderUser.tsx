import styled from "styled-components";
import UserNav from "../UserNav";
import { useState } from "react";

import UserIcon from "../../icon/user.svg";

const HeaderUser = () => {
  const [isUserNavShow, setIsUserNavShow] = useState<boolean>(false);

  return (
    <>
      <UserBtn
        src={UserIcon}
        onClick={() => setIsUserNavShow(!isUserNavShow)}
      />
      {isUserNavShow && <UserNav setIsUserNavShow={setIsUserNavShow} />}
    </>
  );
};

export default HeaderUser;

// style
const UserBtn = styled.img`
  width: 1.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;
