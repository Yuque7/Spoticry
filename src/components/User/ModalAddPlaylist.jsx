import { useState, useEffect } from "react";
import styled from "styled-components";
import { addPlaylist } from "../../services/playlist";
import { fetchAllSong } from "../../services/songs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

// Componente principal para criação da playlist
function AdicionarPlaylist() {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetchAllSong();
        if (response && response.songs) {
          setSongs(response.songs);
        } else {
          console.error("Músicas não encontradas na resposta");
        }
      } catch (error) {
        console.error("Erro ao carregar músicas:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const payload = {
      userId,
      songs: selectedSongs,
      description: playlistDescription,
      name: playlistName,
    };

    try {
      const response = await addPlaylist(payload);
      toast.success("Playlist criada com sucesso!");
      setPlaylistName("");
      setPlaylistDescription("");
    } catch (error) {
      toast.error("Erro ao criar playlist. Tente novamente.");
      console.error("Erro ao criar playlist:", error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <h1>Nova Playlist</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome da Playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            required
          />
          <Textarea
            placeholder="Descrição da Playlist"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            required
          />
          <SubmitButton type="submit">Criar Playlist</SubmitButton>
        </form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
}

export default AdicionarPlaylist;
