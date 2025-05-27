// Scss
import "../css/Components/Gapblock.scss";

export default function GapBlock({isFull}) {
  return <div className={`gap${isFull ? " full" : ""}`}></div>;
}
