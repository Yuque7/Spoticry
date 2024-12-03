import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalOverlay,ModalWrapper,SongItem,
  SongList,RemoveSongButton,Container,CustomButton,ButtonText } from '../../styles/User/RemoveStyles';

const RemoveSongsComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
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
    setSelectedSongs((prevSelected) =>
      prevSelected.includes(songId)
        ? prevSelected.filter((id) => id !== songId)
        : [...prevSelected, songId]
    );
  };

  const handleRemoveSelected = async () => {
    try {
      if (selectedSongs.length > 0) {
        setLoading(true);
        toast.info('Removendo música, aguarde...');

        for (const songId of selectedSongs) {
          const song = songs.find((song) => song.id === songId);

          // Verifique se a música pertence ao usuário logado
          if (song && song.userId !== userId) {
            toast.error(`Você não pode excluir a música '${song.title}', pois não é o criador.`);
            return;
          }

          // Se a música pertence ao usuário, exclua-a
          await axios.delete(
            `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song/${songId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        }

        setSongs((prevSongs) => prevSongs.filter((song) => !selectedSongs.includes(song.id)));
        setSelectedSongs([]);
        setModalOpen(false);
        toast.success('Música(s) removida(s) com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao remover músicas:', error);
      setError('Erro ao remover músicas. Tente novamente.');
      toast.error('Erro ao remover música. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CustomButton onClick={() => setModalOpen(true)}>
        <ButtonText>Remover música</ButtonText>
      </CustomButton>

      {isModalOpen && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <ModalWrapper>
            <h2>REMOVER MÚSICAS</h2>
            {isLoading && <p>Removendo músicas...</p>}
            {error && <p>{error}</p>}
            <SongList>
              {songs.length === 0 ? (
                <p>Você não tem músicas para remover.</p>
              ) : (
                songs.map((song) => (
                  <SongItem key={song.id}>
                    <input
                      type="checkbox"
                      checked={selectedSongs.includes(song.id)}
                      onChange={() => handleToggleSelection(song.id)}
                    />
                    {song.title} | {song.artist}
                  </SongItem>
                ))
              )}
            </SongList>
            <RemoveSongButton onClick={handleRemoveSelected} disabled={isLoading}>
              Remover Selecionadas
            </RemoveSongButton>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default RemoveSongsComponent;
