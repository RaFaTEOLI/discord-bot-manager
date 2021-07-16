import Switch from '../Switch';
import { HeaderContainer, LeftContainer } from './styles';

interface HeaderProps {
  title: string | undefined;
}

const botName = 'Rubeo';
const imgUrl = `https://robohash.org/${botName}?gravatar=hashed`;

function Header({ title }: HeaderProps) {
  return (
    <HeaderContainer>
      <LeftContainer>
        <img src={imgUrl} alt='logo' />
        <h1>{title}</h1>
      </LeftContainer>
      <>
        <Switch />
      </>
    </HeaderContainer>
  );
}

export default Header;
