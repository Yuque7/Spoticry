import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SongGridContainer,
  SongGrid,
  SongCard,
  SongImage,
  SongTitle,
  ArtistName,
  Name,
} from '../../styles/Paginaprincipal/SongListStyles';

const ListSongs = () => {
  const [musicas, setMusicas] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song',
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setMusicas(response.data.songs);
      } catch (error) {
        console.error('Erro ao obter músicas:', error);
      }
    };

    fetchData();
  }, [token]);

  const getYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : 'https://via.placeholder.com/150';
  };

  return (
    <SongGridContainer>
      <div>
        <Name>Músicas</Name>
        
        
      </div>
      <SongGrid>
        {musicas.map((musica) => (
          <SongCard key={musica.id}>
            <SongImage
              src={getYouTubeThumbnail(musica.url)}
              alt={`Thumbnail da música ${musica.title}`}
            />
            <div>
              <SongTitle>{musica.title}</SongTitle>
              <ArtistName>{musica.artist}</ArtistName>
            </div>
          </SongCard>
        ))}
      </SongGrid>
    </SongGridContainer>
  );
};

export default ListSongs;