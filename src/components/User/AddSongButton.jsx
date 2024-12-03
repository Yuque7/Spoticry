
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Container,CustomButton,ButtonText,Overlay,ModalWrapper,MusicButton,MusicForm,MusicInput, Title } from '../../styles/User/AddStyles';

const AddSongButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddMusic = async () => {
        try {
            setLoading(true);
            toast.info('Adicionando música, aguarde...');
            const token = localStorage.getItem('token');
            await axios.post(
                'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song',
                {
                    title,
                    artist,
                    url,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            toast.success('Música adicionada com sucesso!');
            console.log('Música adicionada com sucesso!');
        } catch (error) {
            toast.error('Erro ao adicionar música. Tente novamente.');
            console.error('Erro ao adicionar música:', error);
        } finally {
            setLoading(false);
            closeModal();
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <Container>
            <CustomButton onClick={openModal}>
                <ButtonText>Nova Música</ButtonText>
            </CustomButton>

            {isModalOpen && (
                <Overlay onClick={handleOverlayClick}>
                    <ModalWrapper>
                        <Title>Adicionar Nova Música</Title>
                        <MusicForm>
                            <MusicInput
                                type="text"
                                placeholder="Título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <MusicInput
                                type="text"
                                placeholder="Artista"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                required
                            />
                            <MusicInput
                                type="text"
                                placeholder="URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                            <MusicButton type="button" onClick={handleAddMusic} disabled={loading}>
                                {loading ? 'Adicionando...' : 'Adicionar Música'}
                            </MusicButton>
                        </MusicForm>
                    </ModalWrapper>
                </Overlay>
            )}
        </Container>
    );
};

export default AddSongButton;