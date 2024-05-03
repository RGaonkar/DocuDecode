import { useState } from 'react';
import * as React from "react";

// @ts-ignore
const HighlightedWord = ({ word, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    cursor: 'pointer',
    textDecoration: 'underline', // Underline to indicate it's clickable
    padding: '0.2rem', // Padding around the text
    borderRadius: '0.2rem', // Rounded corners for the background
    backgroundColor: 'rgba(173, 216, 230, 0.4)', // Light blue background color with opacity
    color: '#3a6db5', // Blue text color
    transition: 'all 0.3s ease', // Smooth transition for hover effects
    marginBottom: '0.5rem',
    fontSize:"20px"
  };

  const hoverStyle = {
    ...baseStyle,
    backgroundColor: 'rgba(173, 216, 230, 0.7)', // Darker or more opaque blue on hover
    textShadow: '0 0 10px rgba(173, 216, 230, 1), 0 0 20px rgba(135, 206, 235, 1)', // Glowing effect on hover
  };

  return (
    <span
      style={isHovered ? hoverStyle : baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick()} 
    >
      {word}
    </span>
  );
};

export default HighlightedWord;
