import React, { useState, useEffect } from "react";
import axios from "axios";

function List(props) {
  const [myList, setMyList] = useState([]);
  const getMyList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/my-chord-progressions"
      );
      const responseData = await response.data;
      const result = await responseData.map((ele, index) => (
        <li key={index}>{ele.chord_progression}</li>
      ));
      console.log(result);
      setMyList(result);
    } catch (error) {
      console.error("API呼び出しエラー:", error.message);
    }
  };

  useEffect(() => {
    getMyList();
    console.log(myList);
  }, [props.view]);

  return (
    <div className="my-list">
      <h2>My Chord Progressions</h2>
      {myList}
    </div>
  );
}

export default List;
