import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PlaylistTb from "../components/PaginaPrincipal/PlaylistTb";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import AdicionarPlaylist from "../components/User/ModalAddPlaylist";  // Importando a modal
import Navbar from "../components/PaginaPrincipal/Navbar";
import AddSongButton from "../components/User/AddSongButton";
import EditSongButton from "../components/User/EditSongButton";  // Importando o componente de editar música
import RemoveSongsComponent from "../components/User/RemoveSongButton"; // Importando o novo componente
import EditSongsComponent from "../components/User/EditSongButton";
import { GlobalStyled } from "../GlobalStyles";

// Função para recuperar o userId do token
const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; // Substitua 'id' pelo nome correto no seu payload JWT
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

const SearchBar = styled.input`
  margin-top: 4%;
  width: 50%;
  margin-left: 25%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PlaylistTable = styled.table`
width: 100%;
border-collapse: collapse;
margin-top: 20px;
background-color: #3a3838;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);


td,th {
  padding: 12px;
  color: chartreuse;
}

th {
  font-weight: bold;
  font-size: 1.1rem;
  border-bottom: 2px solid #444;
  color: chartreuse;
}

td {
  font-size: 1rem;
  border-bottom: 1px solid #333;
}

tr:hover td {
  background-color: #2a2a2a;
}

@media (max-width: 768px) {
  font-size: 0.9rem;
}
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationInfo = styled.span`
  font-size: 16px;
`;

const PlaylistUser = styled.div`
  h3 {
    color: #ffff;
  }
`;

const ActionButton = styled.div`
display: flex;
gap: 20px;
`;

function User() {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a modal
  const [isEditSongModalOpen, setIsEditSongModalOpen] = useState(false); // Estado para controlar a modal de edição de música
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);

    if (!userId) {
      setFeedback("Erro: Usuário não autenticado.");
      return;
    }

    axios
      .get(
        `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/user/${userId}/playlists`,
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setPlaylists(res.data.playlists || []);
        setFilteredPlaylists(res.data.playlists || []);
      })
      .catch((err) => {
        console.error("Erro ao buscar playlists do usuário:", err);
        setFeedback("Erro ao carregar suas playlists.");
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      const filtered = playlists.filter(
        (playlist) =>
          playlist._name.toLowerCase().includes(query) ||
          playlist._description.toLowerCase().includes(query)
      );
      setFilteredPlaylists(filtered);
      setCurrentPage(0);
    }, 500);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < filteredPlaylists.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const paginatedPlaylists = filteredPlaylists.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <GlobalStyled/>
      <Container>
        <ContainerPrincipal>
          <Navbar />
          {/* Barra de busca */}
          <SearchBar
            type="text"
            placeholder="Pesquisar por nome ou descrição..."
            value={searchQuery}
            onChange={handleSearch}
          />

          {feedback && <p>{feedback}</p>}

          <PlaylistUser>
            <div>
              <h3>Minhas Playlists</h3>
              {/* Botões de ações */}
              <PaginationButton onClick={() => setIsModalOpen(true)}>
                Adicionar Playlist
              </PaginationButton>
              <ActionButton>
              <AddSongButton /> {/* Aqui está o botão para adicionar música */}
              <EditSongsComponent/>
              <RemoveSongsComponent />
              </ActionButton>

            </div>

            <PlaylistTable>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPlaylists.map((playlist, index) => (
                  <PlaylistTb key={playlist._id} playlist={playlist} index={startIndex + index} />
                ))}
              </tbody>
            </PlaylistTable>
          </PlaylistUser>

          <PaginationContainer>
            <PaginationButton
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Anterior
            </PaginationButton>
            <PaginationInfo>
              Página {currentPage + 1} de{" "}
              {Math.ceil(filteredPlaylists.length / itemsPerPage)}
            </PaginationInfo>
            <PaginationButton
              onClick={handleNextPage}
              disabled={(currentPage + 1) * itemsPerPage >= filteredPlaylists.length}
            >
              Próxima
            </PaginationButton>
          </PaginationContainer>
        </ContainerPrincipal>

        {/* Modal Adicionar Playlist */}
        {isModalOpen && (
          <AdicionarPlaylist closeModal={() => setIsModalOpen(false)} />
        )}
      </Container>
    </>
  );
}

export default User;
