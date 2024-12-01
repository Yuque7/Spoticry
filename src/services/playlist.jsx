import api from '../utils/api';
import { getToken } from '../services/GetToken';


//MÉTODO QUE BUSCA TODAS AS PLAYLIST CRIADAS NA API
export async function fetchAllPlaylists() {
    try {
        const token = getToken();
        const response = await api.get('/playlist', {
            headers: {
                Authorization: token
            }
        });
        return response.data;

    } catch (error) {
        console.error('Erro ao buscar playlist:', error);
        return [];
    }
}

//MÉTODO QUE ADICIONA UMA PLAYLIST
export function addPlaylist(playlistData) {
    const token = getToken();
    return api.post('/playlist', playlistData, {
        headers: {
            Authorization: token
        }
    });
}

//MÉTODO PARA EDITAR UMA PLAYLIST
export function editPlaylist(playlistId, playlistData) {
    const token = getToken();
    return api.put(`/playlist/${playlistId}`, playlistData, {
        headers: {
            Authorization: token
        }
    });
}


//MÉTODO PARA DELETAR UMA PLAYLIST
export function deletePlaylist(playlistId) {
    const token = getToken();
    return api.delete(`/playlist/${playlistId}`, {
        headers: {
            Authorization: token
        }
    });
}


//MÉTODO PARA ADICIONAR UMA MUSICA A PLAYLIST
export function addSongPlaylist(playlistId, songId) {
    const token = getToken();
    return api.post(`/playlist/${playlistId}/song`, { songId }, {
        headers: {
            Authorization: token
        }
    });
}


//MÉTODO PARA DELETAR UMA MUSICA DA PLAYLIST
export function deleteSongPlaylist(playlistId, songId) {
    const token = getToken();
    return api.delete(`/playlist/${playlistId}/song/${songId}`, {
        headers: {
            Authorization: token
        }
    });
}