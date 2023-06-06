import React, { useState } from "react";

import "./styles.css";
const defaultPlayerImg = require("../../assets/default-player-img.png");

const PlayerList = ({ players }) => {
  const [plist, setPlist] = useState(players);
  let photos;

  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  photos = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
  );

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    searchTerm === ""
      ? setPlist(players)
      : setPlist(
          players.filter(
            (item) =>
              item.PFName.toLowerCase().includes(searchTerm) ||
              item.TName.toLowerCase().includes(searchTerm)
          )
        );
  };

  const handleDate = (date) => {
    let date_time = new Date(date + " UTC");

    return date_time.toLocaleString().replace(/\//g, "-");
  };

  return (
    <>
      <h2>Players</h2>
      <div className="search-container">
        <input
          type="text"
          name="search_player"
          placeholder="Search Player by TName, PFName... "
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="player-card-container">
        {plist !== undefined && photos && plist.length !== 0 ? (
          plist
            .sort((a, b) => {
              return a.Value - b.Value;
            })
            .map((item) => {
              return (
                <div className="player-card" key={item.Id}>
                  <img
                    src={
                      photos[`${item.Id}.jpg`] === undefined
                        ? defaultPlayerImg
                        : photos[`${item.Id}.jpg`]
                    }
                    alt={item.Id}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultPlayerImg;
                    }}
                  />
                  <h4 className="player-name">{item.PFName}</h4>
                  <p>{item.SkillDesc}</p>
                  <p className="player-value">${item.Value}</p>
                  {item.UpComingMatchesList[0].CCode !== "" ||
                  item.UpComingMatchesList[0].VsCCode !== "" ? (
                    <>
                      <p className="next-match">Upcoming Match</p>
                      <p className="versus">
                        <span>{item.UpComingMatchesList[0].CCode}</span> v/s
                        <span>{item.UpComingMatchesList[0].VsCCode} </span>
                      </p>
                      <p className="game-datetime">
                        {handleDate(item.UpComingMatchesList[0].MDate)}
                      </p>
                    </>
                  ) : (
                    <p className="no-match">No Upcoming Match</p>
                  )}
                </div>
              );
            })
        ) : (
          <div className="no-match-found">No Match Found!</div>
        )}
      </div>
    </>
  );
};

export default PlayerList;
