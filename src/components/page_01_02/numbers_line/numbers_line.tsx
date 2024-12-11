import "./numbers_line.css";

interface NumbersLineProps {
  appear: boolean;
  active: number; // Active step, ranges from 1 to 3
}

function NumbersLine({ appear, active }: NumbersLineProps) {
  if (!appear) return null;

  return (
    <div id="circle-container">
      {/* Step 1 */}
      <div
        className={`circle ${active >= 1 ? "active" : "inactive"}`}
        data-step="1"
      >
        {active >= 1 ? "1" : ""}
      </div>
      <div className={`line ${active >= 2 ? "active-line" : ""}`}></div>

      {/* Step 2 */}
      <div
        className={`circle ${active >= 2 ? "active" : "inactive"}`}
        data-step="2"
      >
        {active >= 2 ? "2" : ""}
      </div>
      <div className={`line ${active >= 3 ? "active-line" : ""}`}></div>

      {/* Step 3 */}
      <div
        className={`circle ${active >= 3 ? "active" : "inactive"}`}
        data-step="3"
      >
        {active >= 3 ? "3" : ""}
      </div>
    </div>
  );
}

export default NumbersLine;
