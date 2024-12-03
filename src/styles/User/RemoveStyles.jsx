import styled from 'styled-components'


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWrapper = styled.div`
  background-color: #1C3734;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

export const SongList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SongItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }
`;

export const RemoveSongButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  font-family: 'Roboto', sans-serif;
`;

export const CustomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 200px;
  height: 45px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

export const ButtonText = styled.span`
  font-weight: bold;
  font-size: 15px;
`;