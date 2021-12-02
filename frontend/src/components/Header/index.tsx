import Switch from '../Switch';
import { HeaderContainer, LeftContainer } from './styles';

interface HeaderProps {
  title: string | undefined;
  handleToggle: () => void;
  theme: string;
}

const botName = process.env.REACT_APP_BOT_NAME;
const imgUrl = `https://robohash.org/${botName}?gravatar=hashed`;

const Header = ({ title, handleToggle, theme }: HeaderProps) => (
  <HeaderContainer>
    <LeftContainer>
      <img src={imgUrl} alt="logo" />
      <h1>{title}</h1>
    </LeftContainer>
    <Switch theme={theme} handleToggle={handleToggle} />
  </HeaderContainer>
);

export default Header;
