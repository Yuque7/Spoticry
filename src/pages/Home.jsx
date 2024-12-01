import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlaylistCard from '../components/PaginaPrincipal/PlaylistCard';
import axios from 'axios';
import Navbar from '../components/PaginaPrincipal/Navbar';
import { useNavigate } from 'react-router-dom'; // Para navegar até a página de detalhes da playlist
import ListSongs from '../components/PaginaPrincipal/SongList';
import { GlobalStyled } from '../GlobalStyles';


// Styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ContainerPrincipal = styled.div`
  width: 80%;
  margin: auto;
`;

const PlaylistList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 2rem;  /* Adiciona espaço entre o título e a lista */
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #ffffff;
  margin-top: 60px;
  width: 100%;
`;

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate(); // Hook para navegação

  // Função para embaralhar as playlists
  const shufflePlaylists = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca elementos
    }
    return arr;
  };

  // Chamada para buscar playlists da API
  useEffect(() => {
    async function loadPlaylists() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist',
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPlaylists(response.data.playlists || []);
      } catch (error) {
        console.error('Erro ao carregar playlists:', error);
      }
    }
    loadPlaylists();
  }, []);

  const handlePlaylistClick = (playlistId) => {
    // Redireciona o usuário para a página de detalhes da playlist
    navigate(`/playlist/${playlistId}`);
  };

  // Obtemos as 10 últimas playlists da comunidade e as aleatórias
  const communityPlaylists = playlists.slice(-10).reverse();
  const randomPlaylists = shufflePlaylists([...playlists]);

  return (
    <>
      <GlobalStyled/>
      <Container>
        <ContainerPrincipal>
          <Navbar />
          {/* Playlists da Comunidade */}
          <Title>Playlist da Comunidade</Title>
          <PlaylistList>
            {communityPlaylists.map((playlist) => (
              <div
                key={playlist._id}
                onClick={() => handlePlaylistClick(playlist._id)} // Navegar para os detalhes da playlist
              >
                <PlaylistCard playlist={playlist} />
              </div>
            ))}
          </PlaylistList>
          <ListSongs/>
        </ContainerPrincipal>
      </Container>
    </>
  );
}

export default Home;
