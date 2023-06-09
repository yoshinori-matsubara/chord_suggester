//npm install react-iconsを実施すると使用できる
import { FaRegListAlt } from "react-icons/fa";
import { CiMusicNote1 } from "react-icons/ci";
import { FaPlay, FaStop, FaDownload, FaMusic } from "react-icons/fa";
import "./styles/Footer.css";

export default function Footer(props) {
  const {
    setView,
    playMidi,
    isPlaying,
    downloadMidi,
    selectInstrument,
    selectedChordProgression,
  } = props;
  const changeMode = (e) => {
    setView(e.currentTarget.id);
  };
  return (
    <footer className="footer">
      <div className="controls">
        <span className="title-selected-chord-progression">
          Selected Chord Progression:
        </span>
        <div>
          <div className="selected-chord-progression">
            {selectedChordProgression}
          </div>
          <button className="control-button" onClick={playMidi}>
            {isPlaying ? <FaStop /> : <FaPlay />}
          </button>
          <button className="control-button" onClick={downloadMidi}>
            <FaDownload />
          </button>
          {/* <div className="instrument-select-container">
            <FaMusic />
            <select
              className="instrument-select"
              onChange={(e) => selectInstrument(e.target.value)}
            >
              <option value="piano">Piano</option>
            </select>
          </div> */}
        </div>
        <CiMusicNote1
          className="footer__button"
          onClick={changeMode}
          id="chord-progressions"
        />
        <FaRegListAlt
          className="footer__button"
          onClick={changeMode}
          id="list"
        />
      </div>
    </footer>
  );
}
