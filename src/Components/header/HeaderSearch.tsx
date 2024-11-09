import { ChangeEvent, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import SearchIcon from "../../icon/search.svg";

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

const HeaderSearch = ({}) => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchInputOpen, setSearchInputOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchMovie = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchInputRef.current?.value;
    if (query) {
      navigate(`/search?query=${query}`);
    }
    setInputValue("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
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
          onClick={() => setSearchInputOpen(!searchInputOpen)}
        />
      </SearchBtn>
    </Search>
  );
};

export default HeaderSearch;

// style
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
