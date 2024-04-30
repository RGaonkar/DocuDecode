// src/Popover.tsx

import { useState, useRef, cloneElement } from 'react';

interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactElement;
  url?: string;
  urlText?: string;
}

const Popover: React.FC<PopoverProps> = ({ content, children, url, urlText }) => {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <span style={{ position: 'relative' }} ref={targetRef}>
      {cloneElement(children, { onClick: toggleVisibility })}
      {visible && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '8px',
            padding: '10px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '20px',
            zIndex: 100,
            width: '500px',
            fontSize:"20px"
          }}
        >
          <div>{content}</div><div><a href={url}>{urlText}</a></div>
        </div>
      )}
    </span>
  );
};

export default Popover;
