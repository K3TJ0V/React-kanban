import "./styles/Header.scss";
import "./HamburgerButton";
import HamburgerButton from "./HamburgerButton";
interface HeaderProps {
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  hamburger: boolean;
}

function Header({ setHamburger, hamburger }: HeaderProps) {
  return (
    <header className="header">
      <HamburgerButton setHamburger={setHamburger} hamburger={hamburger} />
      <h1 className="header__h1">Welcome back USER</h1>
    </header>
  );
}

export default Header;
