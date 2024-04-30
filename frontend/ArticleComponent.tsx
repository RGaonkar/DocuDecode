import * as React from "react";
import Popover from "./Popover";
import Article from "./Article";
import { useState } from "react";
import HighlightedWord from './HighlightedWord';

function containsFullPhrase(text: string, phrase: string): boolean {
  // Escape special characters in the search phrase for RegEx
  const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create a Regular Expression with word boundaries and case-insensitive flag
  const regex = new RegExp(`\\b${escapedPhrase}\\b`, 'i');

  // Test if the text contains the full phrase
  return regex.test(text);
}

const ArticleComponent: React.FC<Article> = ({ text, novice, intermediate, expert, textV2 } :Article) => {
  const [explanation, setExplanation] = useState("Need some help?");

  const handleClick = (phrase: string) => {
    setExplanation(phrase)
  };
  
  const renderTextWithHighlights = (paragraph: string) => {
    let highlightedText: JSX.Element[] = [];
    let cursor = 0;

    const phrasesToHighlight = Object.keys(novice);

    // Sort phrases by length in descending order to prioritize longer phrases during replacement
    const sortedPhrases = [...phrasesToHighlight].sort((a, b) => b.length - a.length);

    while (cursor < paragraph.length) {
      let foundPhrase = false;

      for (const phrase of sortedPhrases) {
        // if (text.substr(cursor, phrase.length).toLowerCase() === phrase.toLowerCase()) {
        if (containsFullPhrase(paragraph.substring(cursor, phrase.length+cursor), phrase)) {
          // Found a phrase to highlight
          highlightedText.push(
                <Popover key={cursor} content={novice[phrase].explanation} url={novice[phrase].url} urlText={novice[phrase].title}>
                  <HighlightedWord key={cursor} word={phrase} onClick={() => handleClick(novice[phrase].explanation)}/>
                </Popover>
          );
          cursor += phrase.length; // Move the cursor past this phrase
          foundPhrase = true;
          break; // Break out of the loop since we found a phrase
        }
      }

      if (!foundPhrase) {
        // If no phrase was found, move the cursor one character forward and add the character to the output
        highlightedText.push(<span key={cursor} style={{marginBottom: '0.5rem', fontSize:"20px"}}>{paragraph[cursor]}</span>);
        cursor++;
      }
    }

    return highlightedText;
  };

  return (<div style=
    {{textAlign:"left", 
    marginLeft:"50px", 
    marginRight:"50px", 
    marginTop:"50px", cursor:"default",
  borderRadius: "20px", border: "1px solid black", 
  padding: "20px", flexGrow:"1"}}>
    {textV2.map((text, index) => (
    <p key={index}>{renderTextWithHighlights(text)}</p>
    ))}
    </div>);
};

export default ArticleComponent;