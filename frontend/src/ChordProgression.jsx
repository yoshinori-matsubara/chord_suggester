import React, { useEffect } from "react";
import axios from "axios";
import "./styles/ChordProgression.css";
import Control from "./Control";

function ChordProgression(props) {
  const url = process.env.REACT_APP_DATABASE_URL || "http://localhost:8080";
  const {
    mood,
    setMood,
    chordProgressions,
    setChordProgressions,
    selectedChordProgressions,
    setSelectedChordProgressions,
    setIsLoading,
    playMidi,
    isPlaying,
    downloadMidi,
    selectedChordProgression,
    handleClick,
  } = props;

  const saveChordProgression = async () => {
    if (selectedChordProgressions.length === 0) {
      alert("保存するコード進行を選択してください。");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/chord-progressions`, {
        chordProgressions: selectedChordProgressions,
        mood,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
      alert("コード進行の保存に失敗しました。");
    }
  };

  const handleCheckboxChange = (chordProgression) => {
    const isChecked = selectedChordProgressions.includes(chordProgression);
    if (isChecked) {
      setSelectedChordProgressions(
        selectedChordProgressions.filter((chord) => chord !== chordProgression)
      );
    } else {
      setSelectedChordProgressions([
        ...selectedChordProgressions,
        chordProgression,
      ]);
    }
  };

  const suggestChordProgression = async (e) => {
    if (mood.trim() === "") {
      alert("雰囲気を入力してください。");
      return;
    }
    // ローディングフラグ操作
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${url}/api/chord-progressions/?mood=${mood}`
      );
      const responseData = JSON.parse(response.data.content);
      setChordProgressions(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Suggestion</h2>
      <label htmlFor="mood-input">Mood:</label>
      <input
        type="text"
        id="mood-input"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button onClick={suggestChordProgression}>Suggest</button>
      <div className="result">
        Chord Progressions:
        <ul className="mark-list">
          {chordProgressions.map((ele) => (
            <li key={ele.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedChordProgressions.includes(
                    ele.chordProgression
                  )}
                  onChange={() => handleCheckboxChange(ele.chordProgression)}
                />
              </label>
              <span id={ele.chordProgression} onClick={handleClick}>
                {ele.chordProgression}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={saveChordProgression}>Save</button>
      <Control
        className="control-area"
        playMidi={playMidi}
        isPlaying={isPlaying}
        downloadMidi={downloadMidi}
        selectedChordProgression={selectedChordProgression}
      />
    </div>
  );
}

export default ChordProgression;
