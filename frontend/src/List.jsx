import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/List.css";

function List(props) {
  const url = process.env.REACT_APP_DATABASE_URL || "http://localhost:8080";
  const [myList, setMyList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);

  const getMyList = async () => {
    try {
      const response = await axios.get(`${url}/api/my-chord-progressions`);
      const responseData = await response.data;
      const result = responseData.map((ele, index) => (
        <div className="row" key={index}>
          <span className="select">
            <input
              type="checkbox"
              checked={selectedItems.includes(index)}
              onChange={(event) =>
                handleItemSelect(index, ele.chord_progression, ele.mood)
              }
            />
          </span>
          <span className="chord-progression">{ele.chord_progression}</span>
          <span className="mood">{ele.mood}</span>
        </div>
      ));
      setMyList(result);
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
    }
  };

  useEffect(() => {
    getMyList();
  }, [props.view, selectedItems]);

  const handleItemSelect = (index, chordProgression, mood) => {
    const updatedItems = [...selectedItems];
    const updatedDeleteItems = [...deleteItems];

    if (updatedItems.includes(index)) {
      updatedItems.splice(updatedItems.indexOf(index), 1);
      updatedDeleteItems.splice(
        updatedDeleteItems.indexOf(chordProgression),
        1
      );
    } else {
      updatedItems.push(index);
      updatedDeleteItems.push({
        chordProgression: chordProgression,
        mood: mood,
      });
    }

    setSelectedItems(updatedItems);
    setDeleteItems(updatedDeleteItems);
  };

  const handleRemoveSelected = async () => {
    try {
      const response = await axios.delete(`${url}/api/chord-progressions`, {
        data: deleteItems,
      });
      if (response.status === 200) {
        getMyList(); // 更新されたリストを取得
        setSelectedItems([]); // 選択解除
      }
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
    }
  };

  return (
    <div>
      <h2>Favorites List</h2>
      <div className="list-block">
        <div className="my-list">
          <div className="column-header">
            <span>Select</span>
            <span>Chord Progression</span>
            <span>Mood</span>
          </div>
          {myList}
        </div>
        {selectedItems.length > 0 && (
          <button onClick={handleRemoveSelected}>Remove</button>
        )}
      </div>
    </div>
  );
}

export default List;
