import React, {useState} from 'react';

export const AppContext = React.createContext({
  scores: {1: [], 2: []}, setScores: () => {},
  previousScores: null, setPreviousScores: () => {},
  round: 1, setRound: () => {},
  roundNames: {1: [], 2: []}, setRoundNames: () => {},
  sentence: "", setSentence: () => {},
  showRules: false, setShowRules: () => {},
  showScoring: false, setShowScoring: () => {},
})

export const AppProvider = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showScoring, setShowScoring] = useState(false);
  const [scores, setScores] = useState({1: [], 2: []});
  const [previousScores, setPreviousScores] = useState(null);
  const [round, setRound] = useState(1);
  const [roundNames, setRoundNames] = useState({1: [], 2: []});
  const [sentence, setSentence] = useState("");

  return (
    <AppContext.Provider value={{
      scores, setScores,
      previousScores, setPreviousScores,
      sentence, setSentence,
      gameStarted, setGameStarted,
      round, setRound,
      roundNames, setRoundNames,
      showScoring, setShowScoring,
      showRules, setShowRules,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
