import React, { useState, useEffect } from "react";
import axios from "axios";

function ChordProgression() {
  const [mood, setMood] = useState("");
  const [chordProgression, setChordProgression] = useState([]);

  useEffect(() => {
    console.log(chordProgression);
  }, [chordProgression]);

  const saveChordProgression = async (chordProgression, mood) => {
    try {
      await axios.post("http://localhost:8080/api/chord-progressions", {
        chordProgression,
        mood,
      });
      alert("Chord progression saved successfully!");
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
      alert("Failed to save chord progression.");
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
      const result = responseData.map((ele) => (
        <li
          key={ele.id}
          onClick={() => saveChordProgression(ele.chordProgression, mood)}
        >
          {ele.chordProgression}
        </li>
      ));
      setChordProgression(result);
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
    }
  };

  return (
    <div className="App">
      <label htmlFor="mood-input">曲のイメージ:</label>
      <input
        type="text"
        id="mood-input"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button onClick={suggestChordProgression}>提案</button>
      <div id="result">
        コード進行: <ul>{chordProgression}</ul>
      </div>
    </div>
  );
}

export default ChordProgression;
