import { HeaderContainer } from './styles';

interface HeaderProps {
  title: string | undefined;
}

const botName = 'Rubeo';
const imgUrl = `https://robohash.org/${botName}?gravatar=hashed`;

function Header({ title }: HeaderProps) {
  return (
    <HeaderContainer>
      <>
        <img src={imgUrl} alt='logo' />
        <h1>{title}</h1>
      </>
    </HeaderContainer>
  );
}

export default Header;
