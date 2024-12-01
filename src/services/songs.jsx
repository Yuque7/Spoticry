import api from '../utils/api';
import { getToken } from './GetToken';

export async function fetchAllSong() {
    try {
        const token = getToken();
        const response = await api.get('/song', {
            headers: {
                Authorization: token,
            },
        });
        // Se a resposta contiver 'songs', retornamos esse array
        return response.data.songs || []; 
    } catch (error) {
        console.error('Erro ao buscar músicas:', error);
        return [];  // Retorna um array vazio em caso de erro
    }
}

export async function addSong(songData) {
    try {
        const token = getToken();
        const response = await api.post('/song', songData, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar música:', error);
        throw new Error('Erro ao adicionar música.');
    }
}

export async function editSong(songId, songData) {
    try {
        const token = getToken();
        const response = await api.put(`/song/${songId}`, songData, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao editar música:', error);
        throw new Error('Erro ao editar música.');
    }
}

export async function deleteSong(songId) {
    try {
        const token = getToken();
        const response = await api.delete(`/song/${songId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir música:', error);
        throw new Error('Erro ao excluir música.');
    }
}
