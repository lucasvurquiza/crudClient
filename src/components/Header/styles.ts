import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
`;

export const Title = styled.Text`
  margin-left: 35%;
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-left: 10px;
`;
