import { useState } from 'react';
import './Spinner.scss'; // Assuming you will store your CSS here

const Spinner = () => (
  <div style={{height: '100%', maxHeight: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  </div>
);

export default Spinner;