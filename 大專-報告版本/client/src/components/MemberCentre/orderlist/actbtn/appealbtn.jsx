import React from 'react';

const Appealbtn = () => {
  const handleAppeal = () => {
    window.alert('施工中');
  };

  return (
    <button id="actbtn" onClick={handleAppeal}>
      申訴
    </button>
  );
};

export default Appealbtn;