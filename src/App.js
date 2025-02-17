import { useContext, useState } from "react";
import "./App.css";
import SettingsIcon from "./components/SettingsIcon";
import Row from "./components/Row";
import Rules from "./components/Rules";
import { AppContext } from "./contexts/AppContext";

const sentences = [
  "Play a new game with your family",
  "Friends stick together always",
  "Playing board games is perfect",
  "Basketball games bring people",
  "True friendship lasts forever",
  "Gaming with buddies is the best",
  "Friends make life worth living",
  "Treasure hunt adventures rock",
  "Dancing with friends is joyful",
];

// confirm sentence lengths
// sentences.forEach(sentence => {
//   const formattedSentence = sentence.replace(/[^a-zA-Z]/g, "");
//   console.log(sentence, formattedSentence.length)
// })

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
    showRules,
    setShowRules,
  } = useContext(AppContext);

  let formattedSentence = sentence.replace(/[^a-zA-Z]/g, "");
  const sentenceLeft = formattedSentence.slice(0, midpoint);
  const sentenceRight = formattedSentence.padEnd(26, "-").slice(midpoint, 26);

  const handleChange = (e) => {
    setSentence(e.target.value);
  };

  const handleSwap = () => {
    const nextRound = round === 1 ? 2 : 1;
    setRound(nextRound);
  };

  const handleStart = () => {
    setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    setGameStarted(true);
  };

  const handleNewGame = () => {
    setRound(1);
    setScores({ 1: [], 2: [] });
    setRoundNames({ 1: [], 2: [] });
    setSentence("");
    setGameStarted(false);
  };

  const score = [];
  Object.values(scores).forEach((scoreArray) => {
    const totalScore = scoreArray.reduce((total, current) => {
      return total + (current ?? 0);
    }, 0);
    score.push(totalScore);
  });

  return (
    <div className="App">
      <div className="container">
        {showRules && <Rules />}
        {!gameStarted ? (
          <div className="intro">
            <img
              className="letterCloud"
              src="/images/initials_letter_cloud.jpg"
              alt="Initials letter cloud"
            />
            <img
              className="introLogo"
              src="/images/initials_logo.jpg"
              alt="Initials logo"
            />
            <form className="introSettings">
              <div className="sentenceSetting">
                Write a sentence, or leave blank to get a random one
                <div>
                  <input type="text" value={sentence} onChange={handleChange} />
                  <div>{formattedSentence.length}/26</div>
                </div>
              </div>
              <button type="submit" onClick={handleStart}>
                {formattedSentence.length < 26
                  ? "Random sentence"
                  : "Start game"}
              </button>
            </form>
            <button
              className="buttonSecondary"
              onClick={() => setShowRules(true)}
            >
              Learn how to play...
            </button>
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
                  <div>
                    Sentence:
                    <input type="text" value={sentence} onChange={handleChange} />
                  </div>
                  <button
                    className="buttonSecondary onDark"
                    onClick={() => setShowRules(true)}
                  >
                    Learn how to play...
                  </button>
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
              {showScoring && (
                <div onClick={handleSwap}>
                  Round 1: {score[0]}, Round 2: {score[1]}
                </div>
              )}
              <div className="buttonRow">
                <button onClick={() => setShowScoring(!showScoring)}>
                  {showScoring ? "Hide" : "Show"} scoring
                </button>
                <div>
                  Round {round}{" "}
                  {round === 2 ? (
                    <button onClick={handleNewGame}>New game</button>
                  ) : (
                    <button onClick={handleSwap}>Next round</button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
