import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { addUp } from "../lib";

export default function ScoreGrid({ previous }) {
  const { previousScores, scores } = useContext(AppContext);
  let scoresToDisplay = scores;
  if (previous) {
    scoresToDisplay = previousScores;
  }
  if (previous && !scoresToDisplay[1] && !scoresToDisplay[2]) {
    return null;
  }
  const round1Score = addUp(scoresToDisplay[1]);
  const round2Score = addUp(scoresToDisplay[2]);

  console.log(scoresToDisplay)

  return (
    <div>
      <div className="gridTitle">
        {previous ? "Last game scores" : "Current scores"}
      </div>
      <div className="scoresGrid">
        <div className="leftHeader gridHeader"></div>
        <div className="gridHeader1 gridHeader">Round 1</div>
        <div className="gridHeader2 gridHeader">Round 2</div>
        <div className="gridHeader3 gridHeader gridHeaderTotal">Total</div>
        <div className="rightHeader gridHeader"></div>
        <div className="gridRow1 gridScore">{round1Score}</div>
        <div className="gridRow2 gridScore">{round2Score}</div>
        <div className="gridRow3 gridScore gridTotal">
          {round1Score + round2Score}
        </div>
      </div>
    </div>
  );
}
