import React, { useEffect, useState } from "react";
import axios from "axios";

const Joke = () => {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("joke") === null) setJoke("Loading...");
      else setJoke(localStorage.getItem("joke"));
    }

    axios.get("https://api.chucknorris.io/jokes/random").then((res) => {
      setJoke(res.data.value);
      localStorage.setItem("joke", res.data.value);
    });
  }, []);

  return <h1>{joke}</h1>;
};

export default Joke;
