import "./styles/Header.scss";
import "./HamburgerButton";
import HamburgerButton from "./HamburgerButton";
interface HeaderProps {
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  hamburger: boolean;
  username: string
}

function Header({ setHamburger, hamburger, username }: HeaderProps) {
  return (
    <header className="header">
      <HamburgerButton setHamburger={setHamburger} hamburger={hamburger} />
      <h1 className="header__h1">Welcome back {username}</h1>
    </header>
  );
}

export default Header;
