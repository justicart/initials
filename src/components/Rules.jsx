import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Row from "./Row";

export default function Rules() {
  const { setShowRules } = useContext(AppContext);
  return (
    <div className="rules">
      <h1>
        How to play
        <div className="x" onClick={() => setShowRules(false)}>
          ×
        </div>
      </h1>
      <h2>
        <span>Step 1</span>: Pick a sentence
      </h2>
      <div>
        Think of a sentence that consists of 26 letters and relates to your
        current activity.
        <div className="handwritten">EX: PLAY A NEW GAME WITH YOUR FAMILY</div>
      </div>
      <h2>
        <span>Step 2</span>: Match up initials
      </h2>
      <div>
        The letters from the sentence will be in the second column next to the
        abc's. These line up to create a set of initials.
      </div>
      <div className="demoLetters">
        <Row letter="A" sentenceLetter="P" index="10" readonly={true} />
        <Row letter="B" sentenceLetter="L" index="11" readonly={true} />
        <Row letter="C" sentenceLetter="D" index="12" readonly={true} />
      </div>
      <h2>
        <span>Step 3</span>: Playing the game. Shhh! This is the quiet part.
        Don't tell anyone, just write down the first name you think of.
      </h2>
      <div>
        Try to think of a famous person that coincides with each set of
        initials. Names can be fictional characters or real people. Think of
        athletes, authors, actors, cartoon characters, politicians, artists,
        activists, inventors,... famous familiar names.
      </div>
      <h2>
        <span>Timers</span>: Some like them, some don't.
      </h2>
      <div>
        Set a timer for 7 minutes or play until all players agree they are
        spent.
      </div>
      <h2>
        <span>Scoring</span>: How'd you do??
      </h2>
      <div>
        Tap "Show scores", then, starting from the top, go around the room and
        see what names you came up with. If you have a legitimate name that
        everyone agrees on, you get 3 points. If you have a legitimate name but
        match with another player, you each get 1 point. Tap the "I" or "III"
        based on your score.
      </div>
      <h2>
        <span>Round 2</span>: Swap the columns
      </h2>
      <div>
        Tap "Next round" and play again. This time the sentence letters are on
        the left and the ABCs are on the right.
      </div>
      <h2>
        <span>MAKE IT TOUGHER/CHANGE IT UP</span>
      </h2>
      <div>Try playing the game only using: Athletes</div>
      <div style={{marginTop: 10}}>
        Instead of coming up with a sentence, try doubling the alphabet: A.A.,
        B.B., C.C., D.D., etc.
      </div>
      <div className="footer">
        <p>iNiTiALS, the distinctive design of the game in its entirety is a
        trademark of Tousley Designs LLC.</p><p>Rules © 2020, Tousley Designs 231 E
        110th Street, New York, NY 10029 #2. All Rights Reserved. Printed in
        U.S.A.</p>
      </div>
    </div>
  );
}
