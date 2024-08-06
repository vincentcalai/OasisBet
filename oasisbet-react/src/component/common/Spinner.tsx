import React from 'react';
import './Spinner.css';
import { useSelector } from 'react-redux';

const Spinner = () => {
  const showSpinner = useSelector((state: any) => state['spinner']) ;

  return (
    <div>
      <div id="cover-spin" style={{ display: showSpinner.loader ? 'block' : 'none' }}></div>
    </div>
  );
};

export default Spinner;
