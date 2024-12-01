
import styled from 'styled-components'
import { Link } from 'react-router-dom';
// Styled-components
export const PlaylistCardContainer = styled.div`
  display: flex;
  flex-direction: row;  /* Altera para row para imagem e texto ficarem lado a lado */
  align-items: center;
  margin: 1rem;
  background-color: #f4f4f4;
  border: none;
  border-radius: 5px;
  overflow: hidden;
`;

export const PlaylistLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;  /* Alinha o conteúdo de forma horizontal */
`;

export const PlaylistImage = styled.img`
  width: 100px;  /* Ajusta o tamanho da imagem */
  height: 60px;
  object-fit: cover;
  margin-right: 1rem;  /* Adiciona espaço entre a imagem e o texto */
`;

export const PlaylistInfo = styled.div`
  padding: 0.5rem;
  text-align: left;  /* Alinha o texto à esquerda */
  
  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #0ad035;
  }
`;