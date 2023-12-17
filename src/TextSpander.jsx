import { useState } from "react";

const boxStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  backgroundColor: "#f7f7f7",
};

export default function TextExpander({ children, collapsedNumWords = 20, expandButtonText = "Show More", collapseButtonText = "Show Less", buttonColor = "1f09cd", expanded = false, className }) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displayText = isExpanded ? children : `${children.split(" ").slice(0, collapsedNumWords).join(" ")}...`;
  const buttonStyle = {
    border: "none",
    backgroundColor: "transparent",
    color: buttonColor,
    font: "inherit",
    cursor: "pointer",
    // textDecoration: "underline",
    display: "inline-block",
  };
  return (
    <div className={className} style={boxStyle}>
      <span>{displayText}</span>
      <button style={buttonStyle} onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
