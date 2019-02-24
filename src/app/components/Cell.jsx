import React, { useState } from 'react';

const Cell = props => {
  const [isOpened, setIsOpened] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [minesCount, setMinesCount] = useState(0);
  const {mine, gameOver, onClick, onRightClick} = props;

  const handleClick = () => {
    if (gameOver) {
      return;
    }
    setIsOpened(true);
    setMinesCount(onClick());
  };

  const handleRightClick = e => {
    e.preventDefault();
    if (gameOver || isOpened || isChecked) {
      return;
    }
    onRightClick();
    setIsChecked(true);
  };

  return (
    <div className={'cell' + (isOpened && !minesCount ? ' empty-cell' : '')}
         onClick={handleClick}
         onContextMenu={handleRightClick}
    >
      {gameOver && mine &&
      <div className="mine-cell"/>
      }
      {!gameOver && isOpened && minesCount > 0 &&
        <div className="count-cell">{minesCount}</div>
      }
      {!isOpened && isChecked &&
        <div className="flag-cell"/>
      }
    </div>
  )
};

export default Cell;