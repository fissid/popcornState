import { useState } from "react";

// Examples:

// <TextExpander>Space travel is the ultimate adventure! Imagine soaring past the stars and exploring new worlds. It's the stuff of dreams and science fiction, but believe it or not, space travel is a real thing. Humans and robots are constantly venturing out into the cosmos to uncover its secrets and push the boundaries of what's possible.</TextExpander>

// <TextExpander collapsedNumWords={20} expandButtonText="Show text" collapseButtonText="Collapse text" buttonColor="#ff6622"> Space travel requires some seriously amazing technology and collaboration between countries, private companies, and international space organizations. And while it's not always easy (or cheap), the results are out of this world. Think about the first time humans stepped foot on the moon or when rovers were sent to roam around on Mars. </TextExpander>

// <TextExpander expanded={true} className="box"> Space missions have given us incredible insights into our universe and have inspired future generations to keep reaching for the stars. Space travel is a pretty cool thing to think about. Who knows what we'll discover next! </TextExpander>;

const boxStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  backgroundColor: "#f7f7f7",
};

export default function TextExpander({ children, collapsedNumWords = 20, expandButtonText = "Show More", collapseButtonText = "Show Less", buttonColor = "blue", expanded = false, className }) {
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
