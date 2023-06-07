//npm install react-iconsを実施すると使用できる
import { FaRegListAlt } from "react-icons/fa";
import { CiMusicNote1 } from "react-icons/ci";
import "./styles/Footer.css";

export default function Footer(props) {
  const { setView } = props;
  const changeMode = (e) => {
    setView(e.currentTarget.value);
  };
  return (
    <footer>
      <button className="footer__button" onClick={changeMode} value="chords">
        <CiMusicNote1 />
      </button>
      <button className="footer__button" onClick={changeMode} value="list">
        <FaRegListAlt />
      </button>
    </footer>
  );
}
