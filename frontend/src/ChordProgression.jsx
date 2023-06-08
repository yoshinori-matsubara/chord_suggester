import React, { useEffect } from "react";
import axios from "axios";
import "./styles/ChordProgression.css";

function ChordProgression(props) {
  const url = process.env.PUBRIC_URL || "http://localhost:8080";
  console.log(process.env);
  const {
    mood,
    setMood,
    chordProgressions,
    setChordProgressions,
    selectedChordProgressions,
    setSelectedChordProgressions,
  } = props;

  useEffect(() => {
    console.log(mood);
  }, [mood]);

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

  const suggestChordProgression = async () => {
    if (mood.trim() === "") {
      alert("雰囲気を入力してください。");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/chord-progressions/?mood=${mood}`
      );
      const responseData = JSON.parse(response.data.content);
      setChordProgressions(responseData);
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
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
                {ele.chordProgression}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={saveChordProgression}>Save</button>
    </div>
  );
}

export default ChordProgression;
