import styled, {css} from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomTextProps {
  isActive: boolean;
}

interface ContainerProps {
  isActive: boolean;
}

export const IconMenu = styled(MaterialCommunityIcons)`
  margin-right: 35px;
  margin-left: 16px;
  opacity: 1;
`;

export const CustomText = styled.Text<CustomTextProps>`
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: #999;
  ${props =>
    props.isActive &&
    css`
      color: #ccc000;
    `}
`;

export const Container = styled.TouchableOpacity<ContainerProps>`
  margin: 0px;
  padding: 12px 0px;
  flex-direction: row;
  align-items: center;
  ${props =>
    props.isActive &&
    css`
      background-color: rgba(0, 0, 0, 0.6);
    `}
`;
