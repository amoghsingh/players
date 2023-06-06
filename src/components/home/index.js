import React, { useState, useEffect } from "react";
import PlayerList from "../player-list";
import "./styles.css";

const Home = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlayers(data.playerList);
      });
  }, []);

  return (
    <>
      {players.length > 0 ? (
        <PlayerList players={players} />
      ) : (
        <p className="loader">Loading...</p>
      )}
    </>
  );
};

export default Home;
