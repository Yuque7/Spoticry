import  { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalOverlay,ModalWrapper,SongItem,SongList,EditSongButtonStyled,Container,CustomButton,ButtonText } from '../../styles/User/EditStyles';


const EditSongsComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song', {
          headers: {
            Authorization: token,
          },
        });

        // Filtra as músicas criadas pelo usuário logado
        const userSongs = response.data.songs.filter((song) => song.userId === userId);
        setSongs(userSongs);
      } catch (error) {
        console.error('Erro ao obter músicas:', error);
        setError('Erro ao carregar músicas. Tente novamente.');
      }
    };

    if (isModalOpen) {
      fetchData();
    }
  }, [isModalOpen, userId]);

  const handleToggleSelection = (songId) => {
    setSelectedSongId(songId === selectedSongId ? null : songId);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSelected = async () => {
    try {
      if (selectedSongId) {
        setLoading(true);
        toast.info('Editando música, aguarde...');

        await axios.patch(
          `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song/${selectedSongId}`,
          {
            title: updatedDetails.updatedTitle,
            artist: updatedDetails.updatedArtist,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setUpdatedDetails({});
        setModalOpen(false);
        toast.success('Música editada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao editar música:', error);
      setError('Erro ao editar música. Tente novamente.');
      toast.error('Erro ao editar música. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CustomButton onClick={() => setModalOpen(true)}>
        <ButtonText>Editar música</ButtonText>
      </CustomButton>

      {isModalOpen && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <ModalWrapper>
            <h2>EDITAR MÚSICA</h2>
            {isLoading && <p>Processando...</p>}
            {error && <p>{error}</p>}
            <SongList>
              {songs.length === 0 ? (
                <p>Você não tem músicas para editar.</p>
              ) : (
                songs.map((song) => (
                  <SongItem key={song.id}>
                    <input
                      type="radio"
                      checked={song.id === selectedSongId}
                      onChange={() => handleToggleSelection(song.id)}
                    />
                    {song.title} | {song.artist}
                  </SongItem>
                ))
              )}
            </SongList>
            <div>
              <label htmlFor="updatedTitle">Novo Título: </label>
              <input
                type="text"
                id="updatedTitle"
                name="updatedTitle"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="updatedArtist">Novo Artista: </label>
              <input
                type="text"
                id="updatedArtist"
                name="updatedArtist"
                onChange={handleInputChange}
              />
            </div>
            <EditSongButtonStyled onClick={handleEditSelected} disabled={isLoading}>
              Editar Selecionada
            </EditSongButtonStyled>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default EditSongsComponent;
