import styled from 'styled-components';


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
  background-color: #212121;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;
  height: 45px;

  &:hover {
    background-color: #333;
  }
`;

export const ButtonText = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const ModalWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #1C3734;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  z-index: 3;
`;

export const MusicForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const MusicInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const MusicButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #037dfa;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export  const Title = styled.h2`
  padding-bottom: 12px;
`;