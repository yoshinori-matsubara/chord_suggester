//npm install react-iconsを実施すると使用できる
import { FaRegListAlt } from "react-icons/fa";
import { CiMusicNote1 } from "react-icons/ci";
import "./styles/Footer.css";

export default function Footer(props) {
  const { setView } = props;
  const changeMode = (e) => {
    setView(e.currentTarget.id);
  };
  return (
    <footer className="footer">
      <CiMusicNote1
        className="footer__button"
        onClick={changeMode}
        id="chord-progressions"
      />
      <FaRegListAlt className="footer__button" onClick={changeMode} id="list" />
    </footer>
  );
}
