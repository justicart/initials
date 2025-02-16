export default function ScoreIcon({ score, active }) {
  return (
    <div className={`iconContainer ${active && "active"}`}>
      {score === 3 ? "III" : "I"}
    </div>
  );
}
