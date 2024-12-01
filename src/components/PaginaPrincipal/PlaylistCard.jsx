
import { PlaylistCardContainer,PlaylistImage,PlaylistInfo,PlaylistLink, } from '../../styles/Paginaprincipal/PlaylistCardSrtles';

// Função para cortar o nome e mostrar apenas as 10 primeiras letras
const truncateName = (name) => {
  if (name.length > 10) {
    return name.substring(0, 10) + '...';  // Adiciona "..." caso o nome seja maior que 10 letras
  }
  return name;
};

const PlaylistCard = ({ playlist }) => (
  <PlaylistCardContainer>
    <PlaylistLink to={`/playlists/${playlist._id}`}>
      <PlaylistImage 
        src="https://picsum.photos/200/120" 
        alt={playlist._name} 
      />
      <PlaylistInfo>
        <h3>{truncateName(playlist._name)}</h3>  {/* Usa a função para cortar o nome */}
      </PlaylistInfo>
    </PlaylistLink>
  </PlaylistCardContainer>
);

export default PlaylistCard;
