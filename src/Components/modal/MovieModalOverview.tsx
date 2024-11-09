import styled from "styled-components";

interface MovieModalOverviewProps {
  overview: string;
}

const MovieModalOverview = ({ overview }: MovieModalOverviewProps) => {
  return (
    <>
      {overview ? (
        <InfoText>{overview}</InfoText>
      ) : (
        <InfoTextNone>정보없음</InfoTextNone>
      )}
    </>
  );
};

export default MovieModalOverview;

// style
const InfoText = styled.p`
  padding: 0 1rem;
  padding-bottom: 1rem;
  font-size: 14px;
  letter-spacing: 2px;
  line-height: 2;
`;
const InfoTextNone = styled.p`
  padding: 0 1rem;
  font-size: 14px;
`;
