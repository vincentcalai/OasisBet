import React, { useState } from 'react';
import './Spinner.css';

const Spinner = () => {
  const [spinme, setSpinme] = useState('none'); 

  const showSpinner = () => {
    setSpinme('block');
  };

  const hideSpinner = () => {
    setSpinme('none');
  };

  return (
    <div>
      <div id="cover-spin" style={{ display: spinme }}></div>
      <button onClick={showSpinner}>Show Spinner</button>
      <button onClick={hideSpinner}>Hide Spinner</button>
    </div>
  );
};

export default Spinner;
