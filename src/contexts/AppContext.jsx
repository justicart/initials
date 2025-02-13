import React, {useState} from 'react';

export const AppContext = React.createContext({
  scores: {}, setScores: () => {},
  sentence: "", setSentence: () => {},
})

export const AppProvider = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showScoring, setShowScoring] = useState(false);
  const [scores, setScores] = useState({});
  const [sentence, setSentence] = useState("");

  return (
    <AppContext.Provider value={{
      scores, setScores,
      sentence, setSentence,
      gameStarted, setGameStarted,
      showScoring, setShowScoring,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
