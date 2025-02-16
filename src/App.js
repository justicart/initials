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
    gameStarted,
    round,
    setRound,
    setRoundNames,
    scores,
    setScores,
    sentence,
    setSentence,
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

  const handleSwap = () => {
    const nextRound = round === 1 ? 2 : 1;
    setRound(nextRound)
  }

  const handleNewGame = () => {
    setRound(1);
    setScores({1: [], 2: []});
    setRoundNames({1: [], 2: []});
  }

  const score = [];
  Object.values(scores).forEach(scoreArray => {
    const totalScore = scoreArray.reduce((total, current) => {
      return total + (current ?? 0);
    }, 0)
    score.push(totalScore)
  });

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
              <div className="columnsToRows">
                <div className="rows">
                  {lettersLeft.map((letter, i) => {
                    return (
                      <Row
                        key={`column1_${i}`}
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
                        key={`column2_${i}`}
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
              {showScoring && <div>Round 1: {score[0]}, Round 2: {score[1]}</div>}
              <div className="buttonRow">
                <button onClick={handleNewGame}>
                  New game
                </button>
                <button onClick={() => setShowScoring(!showScoring)}>
                  {showScoring ? "Hide" : "Show"} scoring
                </button>
                <button onClick={handleSwap}>
                  Go to round {round === 1 ? 2 : 1}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
