import React, {useState} from 'react';

export const AppContext = React.createContext({
  scores: {1: [], 2: []}, setScores: () => {},
  round: 1, setRound: () => {},
  roundNames: {1: [], 2: []}, setRoundNames: () => {},
  sentence: "", setSentence: () => {},
})

export const AppProvider = (props) => {
  const [gameStarted, setGameStarted] = useState(true);
  const [showScoring, setShowScoring] = useState(false);
  const [scores, setScores] = useState({1: [], 2: []});
  const [round, setRound] = useState(1);
  const [roundNames, setRoundNames] = useState({1: [], 2: []});
  const [sentence, setSentence] = useState("California to New York friends");

  return (
    <AppContext.Provider value={{
      scores, setScores,
      sentence, setSentence,
      gameStarted, setGameStarted,
      round, setRound,
      roundNames, setRoundNames,
      showScoring, setShowScoring,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
