import React, { useState } from "react";

const GAME_STATES = {
  IDLE: "idle",
  ROUND1: "round1",
  ROUND1SCORING: "round1scoring",
  ROUND2: "round2",
  ROUND2SCORING: "round2scoring",
  REVIEW: "review",
};

export const AppContext = React.createContext({
  gameState: GAME_STATES.IDLE,
  setGameState: () => {},
  scores: { 1: [], 2: [] },
  setScores: () => {},
  previousScores: null,
  setPreviousScores: () => {},
  roundNames: { 1: [], 2: [] },
  setRoundNames: () => {},
  sentence: "",
  setSentence: () => {},
  showRules: false,
  setShowRules: () => {},
});

export const AppProvider = (props) => {
  const [gameState, setGameState] = useState(GAME_STATES.IDLE);
  const [showRules, setShowRules] = useState(false);
  const [scores, setScores] = useState({ 1: [], 2: [] });
  const [previousScores, setPreviousScores] = useState(null);
  const [roundNames, setRoundNames] = useState({ 1: [], 2: [] });
  const [sentence, setSentence] = useState("");

  const isScoringRound = [GAME_STATES.ROUND2SCORING, GAME_STATES.ROUND1SCORING].includes(
    gameState
  );
  let round = [GAME_STATES.ROUND1, GAME_STATES.ROUND1SCORING].includes(
    gameState
  )
    ? 1
    : 2;

  return (
    <AppContext.Provider
      value={{
        round,
        isScoringRound,
        GAME_STATES,
        gameState,
        setGameState,
        scores,
        setScores,
        previousScores,
        setPreviousScores,
        sentence,
        setSentence,
        roundNames,
        setRoundNames,
        showRules,
        setShowRules,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
