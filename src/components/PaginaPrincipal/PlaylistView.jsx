import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { deletePlaylist } from "../../services/playlist"; 
import {
  Container,
  PlaylistHeader,
  PlaylistInfo,
  PlaylistImage,
  PlaylistDetails,
  LeaveButton,
  PlaylistTable,
  Thumbnail,
  DefaultImage,
  SpinnerContainer,
  Spinner,
  ButtonDelete,
  ButtonEdit,
  Buttons
} from "../../styles/Paginaprincipal/PlaylistViewStyled";
import EditPlaylistComponent from "./EditPlaylist";
import { GlobalStyled } from "../../GlobalStyles";

function PlaylistView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [playlist, setPlaylist] = useState(null);
  const [music, setMusic] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newSongId, setNewSongId] = useState("");
  const [newPlaylistName, setNewPlaylistName] = useState("");  // Estado para o novo nome da playlist
  const [isModalOpen, setModalOpen] = useState(false);  // Estado para controlar a abertura do modal de edição

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.id;

        const response = await axios.get(
          `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${id}`,
          { headers: { Authorization: token } }
        );

        const playlistData = response.data.playlist;
        setPlaylist(playlistData);
        setIsCreator(playlistData._userId === userId);
        setNewPlaylistName(playlistData._name);  // Definindo o nome da playlist para edição

        const musicDetailsPromises = playlistData._songs.map(async (songId) => {
          try {
            const songResponse = await axios.get(
              `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song/${songId}`,
              { headers: { Authorization: token } }
            );
            return songResponse.data.song;
          } catch (err) {
            console.error(`Erro ao carregar a música ${songId}:`, err);
            return null;
          }
        });

        const musicDetails = await Promise.all(musicDetailsPromises);
        setMusic(musicDetails.filter((detail) => detail));
      } catch (err) {
        console.error("Erro ao carregar os detalhes da playlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  const handleLeavePlaylist = () => {
    if (location.pathname.includes("userPage")) {
      navigate("/userPage");
    } else {
      navigate("/homePage");
    }
  };

  const handleDeletePlaylist = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta playlist?");
    if (confirmDelete) {
      try {
        await deletePlaylist(id);
        navigate("/userPage");
      } catch (err) {
        console.error("Erro ao deletar a playlist:", err);
      }
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <GlobalStyled/>
      <Container>
        {loading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <>
            <LeaveButton onClick={handleLeavePlaylist}>
              <HiOutlineArrowSmLeft />
            </LeaveButton>

            <PlaylistHeader>
              <PlaylistInfo>
                {playlist?._songs[0] ? (
                  <PlaylistImage
                    src={`https://img.youtube.com/vi/${playlist?._songs[0]}/hqdefault.jpg`}
                    alt={playlist?.name}
                  />
                ) : (
                  <DefaultImage>Padrão</DefaultImage>
                )}

                <PlaylistDetails>
                  <h1>{playlist?._name}</h1>
                  <p>{playlist?._description}</p>
                  {isCreator && (
                    <Buttons>
                      <ButtonDelete onClick={handleDeletePlaylist}>Excluir Playlist</ButtonDelete>
                      {/* Adicionando botão para editar a playlist */}
                      <ButtonEdit onClick={handleOpenModal}>Editar Playlist</ButtonEdit>
                    </Buttons>
                  )}
                </PlaylistDetails>
              </PlaylistInfo>
            </PlaylistHeader>

            <PlaylistTable>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Artista</th>
                  {isCreator && <th>Ações</th>}
                </tr>
              </thead>
              <tbody>
                {music.length === 0 ? (
                  <tr>
                    <td colSpan="4">Nenhuma música encontrada.</td>
                  </tr>
                ) : (
                  music.map((song, index) => (
                    <tr key={song.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Thumbnail
                          src={`https://img.youtube.com/vi/${song.url.split("v=")[1]}/hqdefault.jpg`}
                          alt={song.title}
                        />
                      </td>
                      <td>{song.title}</td> {/* Nome da música */}
                      <td>{song.artist}</td> {/* Nome do artista */}
                      {isCreator && (
                        <td>
                          {/* Ações, se necessário */}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </PlaylistTable>
          </>
        )}
      </Container>

      
{/* Modal de edição de playlist */}
{isModalOpen && (
  <EditPlaylistComponent
    playlistId={id} // Passando o ID da playlist para o EditPlaylistComponent
    initialPlaylistName={newPlaylistName}  // Passando o nome atual da playlist para edição
    onClose={handleCloseModal}  // Função para fechar o modal
  />
)}
    </>
  );
}

export default PlaylistView;
