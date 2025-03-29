import { useContext, useState } from "react";
import "./App.css";
import SettingsIcon from "./components/SettingsIcon";
import Row from "./components/Row";
import Rules from "./components/Rules";
import ScoreGrid from "./components/ScoreGrid";
import { AppContext } from "./contexts/AppContext";
import { formatSentence } from "./lib";

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
//   const formattedSentence = formatSentence(sentence);
//   console.log(sentence, formattedSentence.length);
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
    round,
    isScoringRound,
    GAME_STATES,
    gameState,
    setGameState,
    setRoundNames,
    scores,
    setScores,
    previousScores,
    setPreviousScores,
    sentence,
    setSentence,
    showRules,
    setShowRules,
  } = useContext(AppContext);

  let formattedSentence = formatSentence(sentence);
  const sentenceLeft = formattedSentence.padEnd(26, "-").slice(0, midpoint);
  const sentenceRight = formattedSentence.padEnd(26, "-").slice(midpoint, 26);

  const handleChange = (e) => {
    setSentence(e.target.value);
  };

  const handleAdvance = () => {
    setGameState((currentGameState) => {
      let nextStateIndex = Object.values(GAME_STATES).indexOf(currentGameState) + 1;
      if (nextStateIndex > Object.values(GAME_STATES).length - 1) {
        nextStateIndex = 0;
      }
      return Object.values(GAME_STATES)[nextStateIndex];
    });
  };

  const handleStart = () => {
    if (formattedSentence.length < 26) {
      setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    }
    setGameState(GAME_STATES.ROUND1);
  };

  const handleNewGame = () => {
    setGameState(GAME_STATES.IDLE);
    setPreviousScores(scores);
    setScores({ 1: [], 2: [] });
    setRoundNames({ 1: [], 2: [] });
    setSentence("");
  };

  const score = [];
  Object.values(scores).forEach((scoreArray) => {
    const totalScore = scoreArray.reduce((total, current) => {
      return total + (current ?? 0);
    }, 0);
    score.push(totalScore);
  });

  const advanceButtonText = {
    [GAME_STATES.ROUND1]: "Round 1 scoring",
    [GAME_STATES.ROUND1SCORING]: "Next round",
    [GAME_STATES.ROUND2]: "Round 2 scoring",
    [GAME_STATES.ROUND2SCORING]: "Review",
  }
  console.log("IS SCORING", isScoringRound)

  const intro = (
    <div className="intro">
      <img
        className="letterCloud"
        src="/images/initials_letter_cloud.png"
        alt="Initials letter cloud"
      />
      <img
        className="introLogo"
        src="/images/initials_logo.png"
        alt="Initials logo"
      />
      <form className="introSettings">
        <div className="sentenceSetting">
          <div className="settingsText">
            Type your own sentence or start game with a random sentence
          </div>
          <div>
            <input type="text" value={sentence} onChange={handleChange} />
            <div>{formattedSentence.length}/26</div>
          </div>
        </div>
        <div className="buttonRow">
          <button
            type="button"
            className="button"
            onClick={() => setShowRules(true)}
          >
            Instructions
          </button>
          <button type="submit" onClick={handleStart}>
            Start game
          </button>
        </div>
      </form>
      {previousScores && <ScoreGrid previous={true} />}
    </div>
  )

  const gamePlay = (
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
              <div className="settingsText">
                Sentence{" "}
                <span className="secondaryText">
                  {formattedSentence.length}/26
                </span>
              </div>
              <input
                type="text"
                value={sentence}
                onChange={handleChange}
              />
            </div>
            <div className="buttonRow">
              <button
                className="buttonSecondary onDark"
                onClick={() => setShowRules(true)}
              >
                Instructions
              </button>
              <button className="button" onClick={handleNewGame}>
                New game
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="header">
        <div className="timer"></div>
        <img
          className="logo"
          src="/images/initials_logo.png"
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
        <div className="buttonRow">
          <div className="score">{isScoringRound === true && score[round - 1]}</div>
          <button onClick={handleAdvance}>{advanceButtonText[gameState]}</button>
        </div>
      </div>
    </>
  )

  const review = (
    <>
      <div className="header">
        <div className="timer"></div>
        <img
          className="logo"
          src="/images/initials_logo.png"
          alt="Initials logo"
        />
      </div>
      <div className="review">
        <h2>Review</h2>
        <div>
          <div>The sentence</div>
          <div>{sentence}</div>
        </div>
        <ScoreGrid />
        <button className="button" onClick={handleNewGame}>
          New game
        </button>
      </div>
    </>
  )

  let screen = gamePlay;
  if (gameState === GAME_STATES.REVIEW) {
    screen = review;
  }
  if (gameState === GAME_STATES.IDLE) {
    screen = intro;
  }

  console.log("Game state", gameState)

  return (
    <div className="App">
      <div className="container">
        {showRules && <Rules />}
        {screen}
      </div>
    </div>
  );
}

export default App;
