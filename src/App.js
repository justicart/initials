import { useContext, useState } from "react";
import "./App.css";
import SettingsIcon from "./components/SettingsIcon";
import Row from "./components/Row";
import { AppContext } from "./contexts/AppContext";

const letters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);
// Split the letters array into two columns
const midpoint = Math.ceil(letters.length / 2);
const lettersLeft = letters.slice(0, midpoint);
const lettersRight = letters.slice(midpoint);

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const {
    scores,
    sentence,
    setSentence,
    gameStarted,
    setGameStarted,
    showScoring,
    setShowScoring,
  } = useContext(AppContext);

  let formattedSentence = sentence.replace(/[^a-zA-Z]/g, "");
  const sentenceLeft = formattedSentence.slice(0, midpoint);
  const sentenceRight = formattedSentence.padEnd(26, "-").slice(midpoint, 26);

  const handleChange = (e) => {
    setSentence(e.target.value);
  };

  const score = Object.values(scores).reduce((total, current) => {
    return total + (current ?? 0);
  }, 0);

  return (
    <div className="App">
      <div className="container">
        {!gameStarted ? (
          <div className="intro">
            <img
              className="letterCloud"
              src="/images/initials_letter_cloud.jpg"
              alt="Initials letter cloud"
            />
            <img className="introLogo" src="/images/initials_logo.jpg" alt="Initials logo" />
            <form className="introSettings">
              <div className="sentenceSetting">
                Sentence:
                <input type="text" value={sentence} onChange={handleChange} />
                {formattedSentence.length}/26
              </div>
              <button
                type="submit"
                disabled={formattedSentence.length < 26}
                onClick={() => setGameStarted(true)}
              >
                Start game
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="settingsContainer">
              <div
                className={`settingsButton ${showSettings ? "active" : ""}`}
                onClick={() => setShowSettings(!showSettings)}
              >
                <SettingsIcon color={showSettings ? "white" : "black"} />
              </div>
              {showSettings && (
                <div className="settings">
                  <div className="row">
                    Sentence:
                    <input
                      type="text"
                      value={sentence}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="header">
              <div className="timer"></div>
              <img
                className="logo"
                src="/images/initials_logo.jpg"
                alt="Initials logo"
              />
            </div>
            <div className="playArea">
              <div className="columns">
                <div className="rows">
                  {lettersLeft.map((letter, i) => {
                    return (
                      <Row
                        key={i}
                        letter={letter}
                        sentenceLetter={sentenceLeft[i]}
                        index={i}
                      />
                    );
                  })}
                </div>
                <div className="rows">
                  {lettersRight.map((letter, i) => {
                    return (
                      <Row
                        key={i}
                        letter={letter}
                        sentenceLetter={sentenceRight[i]}
                        index={i + midpoint}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bottomContainer">
              {showScoring && <div>Score: {score}</div>}
              <button onClick={() => setShowScoring(!showScoring)}>
                {showScoring ? "Hide" : "Show"} scoring
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
