import React, { useEffect, useState, Fragment } from 'react';
import Cell from "./Cell";
import { randomInt } from "../helpers";

const COUNT_ROWS = 9;
const COUNT_COLS = 9;
const COUNT_MINES = 10;

const Minefield = () => {
  const mine = {
    coords: [null, null]
  };
  const initialMines = new Array(COUNT_MINES).fill(mine);
  const [mines, setMines] = useState(initialMines);
  const [flags, setFlags] = useState([]);
  const [gameOver, setGameOver] = useState();

  const cells = new Array(COUNT_ROWS)
    .fill( new Array(COUNT_COLS)
      .fill({mine: false})
  );

  const findMineByCoords = (mines, coords) => {
    return mines.find(mine => mine.coords[0] === coords[0] && mine.coords[1] === coords[1])
  };

  const checkFlagsEqualMines = flags => {
    if (flags.length !== mines.length) return false;
    return flags.every(flag => mines.find(mine => mine.coords[0] === flag.coords[0] && mine.coords[1] === flag.coords[1]))
  };

  const generateMines = () => {
    const generatedMines = [];
    mines.forEach(() => {
      let coords = [randomInt(0, COUNT_ROWS - 1), randomInt(0, COUNT_COLS - 1)];
      while (!!findMineByCoords(generatedMines, coords)) {
        coords = [randomInt(0, COUNT_ROWS - 1), randomInt(0, COUNT_COLS - 1)];
      }
      generatedMines.push({coords})
    });
    return generatedMines;
  };

  const handleMine = coords => {
    const [row, col] = coords;
    let flagToDeleteIndex = flags.findIndex(flag => flag.coords[0] === row && flag.coords[1] === col);
    if (flagToDeleteIndex > -1) {
      let newFlags = [...flags];
      newFlags.splice(flagToDeleteIndex, 1);
      setFlags(newFlags);
    }

    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i === row && j === col && !!findMineByCoords(mines,[i, j])) {
          setGameOver({win: false});
          return;
        }
        if (!!findMineByCoords(mines,[i, j])) count++;
      }
    }
    return count;
  };

  const handleFlag = coords => {
    const newFlags = [...flags, {coords}];
    setFlags(newFlags);
    if (checkFlagsEqualMines(newFlags)) setGameOver({win: true});
  };

  const renderCells = () => (
    cells.map((row, rowIndex) => row.map((el, colIndex) => {
      return <Cell key={`${rowIndex}${colIndex}`}
                   mine={!!findMineByCoords(mines,[rowIndex, colIndex])}
                   onClick={() => handleMine([rowIndex, colIndex])}
                   onRightClick={() => handleFlag([rowIndex, colIndex])}
                   gameOver={gameOver}
      />
    }))
  );

  const getSmileClass = () => {
    if (gameOver && gameOver.win) {
      return 'smile-win';
    } else if (gameOver && !gameOver.win){
      return 'smile-lose';
    } else {
      return ''
    }
  };

  useEffect(() => {
    setMines(generateMines());
  }, []);

  return (
    <Fragment>
      <div className={'glasses glasses-' + getSmileClass()}/>
      <div className={'blunt blunt-' + getSmileClass()}/>
      <div className={'smile ' + getSmileClass()}/>
      <section className='minefield'>
        {renderCells()}
      </section>
    </Fragment>
  );
};

export default Minefield;