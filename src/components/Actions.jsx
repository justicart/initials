import { useContext } from "react";

import CrossIcon from "./CrossIcon";
import ManyPeopleIcon from "./ManyPeopleIcon";
import OnePersonIcon from "./OnePersonIcon";
import { AppContext } from "../contexts/AppContext";

export default function Actions({scoreIndex}) {
  const {scores, setScores} = useContext(AppContext);

  const handleScore = (score) => {
    if (scores[scoreIndex] === score) {
      setScores({...scores, [scoreIndex]: null})
    } else {
      setScores({...scores, [scoreIndex]: score})
    }
  }

  return (
    <div className="actions">
      <div
        className={`icon ${scores[scoreIndex] === 3 ? "active" : ""}`}
        onClick={() => handleScore(3)}
      ><OnePersonIcon color="#0586ff" /></div>
      <div
        className={`icon ${scores[scoreIndex] === 1 ? "active" : ""}`}
        onClick={() => handleScore(1)}
      ><ManyPeopleIcon color="#01449f" /></div>
      <div
        className={`icon ${scores[scoreIndex] === 0 ? "active" : ""}`}
        onClick={() => handleScore(0)}
      ><CrossIcon color="#9f0122" /></div>
      <div className="scoreBox">{scores[scoreIndex] ?? ""}</div>
    </div>
  )
}