import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const LinhaClicavel = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ImageDePlaylist = styled.img`
  width: 100px;
  height: 60px;
  object-fit: cover;
`;

const CartaoDePlaylist = ({ playlist, indice }) => {
  const navegar = useNavigate();

  const aoClicarNaLinha = (playlistId) => {
    if (playlistId) {
      navegar(`/playlist/${playlistId}`);
    } else {
      console.error("ID da playlist não encontrado.");
    }
  };

  return (
    <>
    <LinhaClicavel onClick={() => aoClicarNaLinha(playlist._id)}>
      <td>{(typeof indice === 'number' ? indice : 0) + 1}</td>
      <td>
        <ImageDePlaylist
          src={playlist._imageUrl || "https://picsum.photos/200/120"}
          alt={playlist._name || "Imagem padrão"}
        />
      </td>
      <td>
        <h3>{playlist._name || "Nome da playlist não disponível"}</h3>
      </td>
      <td>
        <p>{playlist._description || "Descrição não disponível"}</p>
      </td>
    </LinhaClicavel>
    </>
  );
};

export default CartaoDePlaylist;
