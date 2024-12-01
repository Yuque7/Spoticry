import styled from 'styled-components';

export const SongGridContainer = styled.div`
  overflow: hidden;
  padding-top: 50px;
`;

export const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export const SongCard = styled.div`
  box-sizing: border-box;
  padding: 10px;
  background-color: #0000;
`;

export const SongImage = styled.img`
  width: 200px;
  height: 100px;
  object-fit: cover;
`;

export const SongTitle = styled.strong`
  color: #fff;
  font-size: 18px;
`;

export const ArtistName = styled.p`
  color: #a9a9a9;
  font-size: 14px;
`;

export const Name = styled.h2`
  color: white;
  font-size: 32px;
  padding-left: 10px;
`;
