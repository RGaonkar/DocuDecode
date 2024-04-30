import * as React from "react";
import Article from "./Article";
import { useState } from "react";
import ArticleComponent from "./ArticleComponent";

const ArticleByDifficultyComponent: React.FC<Article> = ({ text, novice, intermediate, expert, textV2 } :Article) => {
    const [level, setLevel] = useState(novice);
    const [stringLevel, setStringLevel] = useState("novice");

  // Inline styles
  const trafficLightContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '400px',
    backgroundColor: '#333',
    borderRadius: '10px',
    padding: '10px',
    color: 'white'
  };

  const lightStyle = {
    cursor: 'pointer',
    height: '30px',
    width: '100px',
    transition: 'transform 0.3s ease',
    alignContent: "center",
    padding: "5px",
    borderRadius: '10px',
  };

  const getLightStyleNew = (level: string) => ({
    ...lightStyle,
    backgroundColor: "#3a6db5",
    transform: stringLevel === level ? 'scale(1.2)' : 'none',
    border: stringLevel === level ? '2px solid #fff' : 'none',
  });

  const updateLevel = (level: string) => {
    if (level === "novice") {
        setLevel(novice);
        setStringLevel("novice");
    }
    if (level === "intermediate") {
        setLevel(intermediate);
        setStringLevel("intermediate");
        getLightStyleNew("intermediate");
    }
    if (level === "expert") {
        setStringLevel("expert");
        setLevel(expert);
        getLightStyleNew("expert");
    }
  };

  return (
  <div style={{display: "flex", 
    flexDirection: "column",
    justifyContent: "flex-end",
    flexGrow: "1",
    alignItems: "center"}}>
    <div style={trafficLightContainerStyle}>
      <div
        style={getLightStyleNew('expert')}
        onClick={() => updateLevel('expert')}
      >Expert</div>
      <div
        style={getLightStyleNew('intermediate')}
        onClick={() => updateLevel('intermediate')}
      >Intermediate</div>
      <div
        style={getLightStyleNew('novice')}
        onClick={() => updateLevel('novice')}
      >Novice</div>
    </div>
    <ArticleComponent text={text} novice={level} intermediate={intermediate} expert={expert} stringLevel={stringLevel} textV2={textV2}/>
  </div>);
};

export default ArticleByDifficultyComponent;
