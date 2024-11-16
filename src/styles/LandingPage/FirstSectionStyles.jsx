import styled from "styled-components";

export const FirstContainer = styled.div`
  display: flex;
  flex-direction: column; 
  margin-top: 4%;
  align-items: center; 
  justify-content: center;
  padding: 20px;
`;

export const FirstContent = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const FirstTitle = styled.h1`
  font-size: 5rem;
  color: #FFFCEC;
  margin-bottom: 10px;
`;

export const TextPrincipal = styled.p`
  font-size: 1rem;
  color: #FFFCEC;
  margin-bottom: 20px;
  line-height: 1.5;
`;

export const ImagePhone = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  img {
    width: 100%;
    max-width: 600px;
  }
`;
