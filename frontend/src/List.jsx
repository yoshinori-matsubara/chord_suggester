import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/List.css";

function List(props) {
  const { selectedChordProgression, handleClick } = props;
  const url = process.env.REACT_APP_DATABASE_URL || "http://localhost:8080";
  const [myList, setMyList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);

  useEffect(() => {
    console.log(selectedChordProgression);
  }, [selectedChordProgression]);

  const getMyList = async () => {
    try {
      const response = await axios.get(`${url}/api/my-chord-progressions`);
      const responseData = await response.data;
      const result = responseData.map((ele, index) => (
        <tr key={index}>
          <td>
            <input
              type="checkbox"
              checked={selectedItems.includes(index)}
              onChange={(event) =>
                handleItemSelect(index, ele.chord_progression, ele.mood)
              }
            />
          </td>
          <td id={ele.chord_progression} onClick={handleClick}>
            {ele.chord_progression}
          </td>
          <td>{ele.mood}</td>
        </tr>
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
        updatedDeleteItems.findIndex(
          (item) => item.chordProgression === chordProgression
        ),
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
        getMyList();
        setSelectedItems([]);
      }
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
    }
  };

  return (
    <div>
      <h2>Favorites List</h2>
      <div className="list-block">
        <div className="list-area">
          <table className="my-list">
            <thead>
              <tr className="column-header">
                <th>Select</th>
                <th>Chord Progression</th>
                <th>Mood</th>
              </tr>
            </thead>
          </table>
          <div>
            <table className="my-list">
              <tbody>{myList}</tbody>
            </table>
          </div>
          {selectedItems.length > 0 && (
            <button onClick={handleRemoveSelected}>Remove</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
