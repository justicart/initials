import { useContext } from "react";

import ScoreIcon from "./ScoreIcon";
import { AppContext } from "../contexts/AppContext";

export default function Actions({scoreIndex}) {
  const {round, scores, setScores} = useContext(AppContext);

  const handleScore = (score) => {
    const roundScores = [...scores[round]];
    if (roundScores[scoreIndex] === score) {
      roundScores[scoreIndex] = null;
    } else {
      roundScores[scoreIndex] = score;
    }
    setScores({...scores, [round]: roundScores})
  }

  return (
    <div className="actions">
      <div
        className="icon"
        onClick={() => handleScore(1)}
      ><ScoreIcon score={1} active={scores[round][scoreIndex] === 1 ? "active" : ""} /></div>
      <div
        className="icon"
        onClick={() => handleScore(3)}
      ><ScoreIcon score={3} active={scores[round][scoreIndex] === 3 ? "active" : ""} /></div>
    </div>
  )
}