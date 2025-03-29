import { useContext } from "react";
import Actions from "./Actions";
import { AppContext } from "../contexts/AppContext";
import ResizableInput from "./ResizableInput";

export default function Row({
  letter,
  sentenceLetter,
  index,
}) {
  const { isScoringRound, roundNames, setRoundNames, round } =
    useContext(AppContext);

  function handleChange(text) {
    const newNames = [...roundNames[round]];
    newNames[index] = text;
    const newRoundNames = { ...roundNames, [round]: newNames };
    setRoundNames(newRoundNames);
  }

  const letters = [
    round === 1 ? letter : sentenceLetter,
    round === 1 ? sentenceLetter : letter,
  ];

  return (
    <div className="row">
      <div className="letter">{(letters[0] ?? "").toUpperCase()}</div>
      <div className="letter">{(letters[1] ?? "").toUpperCase()}</div>
      <div className="inputContainer">
        <ResizableInput
          value={roundNames[round][index] ?? ""}
          handleChange={handleChange}
          forceResize={isScoringRound}
          readonly={isScoringRound}
        />
      </div>
      {isScoringRound && <Actions scoreIndex={index} />}
    </div>
  );
}
