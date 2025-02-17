import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function Rules() {
  const {setShowRules,} = useContext(AppContext);
  return (
    <div className="rules">
      <h1>
        How to play
        <div className="x" onClick={() => setShowRules(false)}>×</div>
      </h1>
      <h2>Step 1: Pick a sentence</h2>
      <div>
        Think of a sentence that consists of 26 letters and
        relates to your current activity.
      </div>
      <h2>STEP 2: Accuracy is key! Dble check b4 u start!</h2>
      <div>

      </div>
    </div>
  )
}