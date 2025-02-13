import { useContext } from "react";
import Actions from "./Actions";
import { AppContext } from "../contexts/AppContext";

export default function Row({ letter, sentenceLetter, index }) {
  const { showScoring } = useContext(AppContext);
  return (
    <div className="row">
      <div className="letter">{letter.toUpperCase()}</div>
      <div className="letter">{sentenceLetter.toUpperCase()}</div>
      <input />
      {showScoring && <Actions scoreIndex={index} />}
    </div>
  );
}
