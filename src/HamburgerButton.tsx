interface HamburgerButtonProps {
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  hamburger: boolean;
}

function HamburgerButton({ setHamburger, hamburger }: HamburgerButtonProps) {
  function onClickHandle() {
    setHamburger(!hamburger);
  }

  return (
    <button className="header__hamburger" onClick={onClickHandle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 16 16"
        fill="white"
      >
        <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
      </svg>
    </button>
  );
}

export default HamburgerButton;
