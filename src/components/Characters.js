import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "crypto-js/md5";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("characters") === null) setCharacters([]);
      else setCharacters(JSON.parse(localStorage.getItem("characters")));
    }

    let ts = Date.now();
    axios
      .get("https://gateway.marvel.com/v1/public/characters", {
        params: {
          ts: ts,
          hash: md5(
            ts +
              "eeef0f499e3ab3178bee765ce6e4c2b30b63c515" +
              "4e27d78287ceaf5fb67fa804c1c5b010"
          ).toString(),
          apikey: "4e27d78287ceaf5fb67fa804c1c5b010",
        },
      })
      .then((res) => {
        setCharacters(res.data.data.results);
        localStorage.setItem(
          "characters",
          JSON.stringify(res.data.data.results)
        );
      });
  }, []);

  return (
    <>
      {characters.length === 0 ? (
        <div style={{ padding: "20px" }}>
          <h2>Loading...</h2>
        </div>
      ) : (
        characters.map((element, index) => (
          <>
            <div
              key={index}
              style={{
                margin: "5px 0px",
              }}
            >
              <img
                src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                alt={element.name}
              />
              <h3>{element.name}</h3>
              <p>{element.description}</p>
            </div>
            <hr />
          </>
        ))
      )}
    </>
  );
};

export default Characters;
