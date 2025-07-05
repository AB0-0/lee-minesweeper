import React, { useState, useEffect } from 'react';
import './App.css';

const TIGER_ICON = process.env.PUBLIC_URL + '/tiger.png';
const BIRD_ICON = process.env.PUBLIC_URL + '/bird.png';

const generateBoard = (size = 36) => {
  const half = size / 2;
  const boardArr = Array(half).fill('tiger').concat(Array(half).fill('bird'));
  for (let i = boardArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [boardArr[i], boardArr[j]] = [boardArr[j], boardArr[i]];
  }
  return boardArr;
};

function App() {
  const [board, setBoard] = useState(generateBoard());
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [tigerScore, setTigerScore] = useState(0);
  const [birdScore, setBirdScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerChoice, setPlayerChoice] = useState(null);

  useEffect(() => {
    const tigerTotal = board.filter(item => item === 'tiger').length;
    const birdTotal = board.filter(item => item === 'bird').length;

    if (playerChoice === 'tiger' && tigerScore === tigerTotal) {
      setGameOver(true);
    } else if (playerChoice === 'bird' && birdScore === birdTotal) {
      setGameOver(true);
    }
  }, [tigerScore, birdScore, board, playerChoice]);

  const handleStart = () => {
    setBoard(generateBoard());
    setRevealed(Array(36).fill(false));
    setTigerScore(0);
    setBirdScore(0);
    setGameOver(false);
    setPlayerChoice(null);
  };

  const handlePlayerSelect = (choice) => {
    setPlayerChoice(choice);
  };

  const handleClick = (index) => {
    if (gameOver || revealed[index]) return;

    const revealedCopy = [...revealed];
    revealedCopy[index] = true;
    setRevealed(revealedCopy);

    if (board[index] === playerChoice) {
      if (playerChoice === 'tiger') {
        setTigerScore(score => score + 1);
      } else {
        setBirdScore(score => score + 1);
      }
    } else {
      setGameOver(true);
    }
  };

  const getWinnerText = () => {
    const tigerTotal = board.filter(i => i === 'tiger').length;
    const birdTotal = board.filter(i => i === 'bird').length;
    if (playerChoice === 'tiger' && tigerScore === tigerTotal) {
      return "You win! (TIGER)";
    }
    if (playerChoice === 'bird' && birdScore === birdTotal) {
      return "You win! (BIRD)";
    }
    if (gameOver) {
      return "You lose!";
    }
    return '';
  }
  
  if (!playerChoice) {
    return (
      <div className="container">
        <h1 className="title">Tiger vs Bird (Kpop Demon Hunters)</h1>
        <p className="inst">
          <strong>Choose your player:</strong>
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <button onClick={() => handlePlayerSelect('tiger')}>
            <img src={TIGER_ICON} alt="Tiger" style={{ width: 60 }} /><br />TIGER
          </button>
          <button onClick={() => handlePlayerSelect('bird')}>
            <img src={BIRD_ICON} alt="Bird" style={{ width: 60 }} /><br />BIRD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`container ${gameOver ? 'game-over' : ''} ${
        playerChoice === 'tiger' ? 'tiger-turn' : playerChoice === 'bird' ? 'bird-turn' : ''
      }`}
    >
      <div className="scoreboard">
        <h3>[ Scoreboard ]</h3>
        <p>| You are: <strong>{playerChoice.toUpperCase()}</strong></p>
        <p>| Tiger Score: {tigerScore}</p>
        <p>| Bird Score: {birdScore}</p>
      </div>

      <h1 className="title">Tiger vs Bird (Kpop Demon Hunters)</h1>

      <p className="inst">
        <strong>Minesweeper Instructions:</strong> <br />
        - You play as <strong>{playerChoice.toUpperCase()}</strong>.<br />
        - Find all your tiles to win.<br />
        - If you click a wrong tile, you lose!
      </p>

      <div className="grid">
        {gameOver && (
          <div className="grid-ovlay">
            {getWinnerText()}
          </div>
        )}

        {board.map((item, index) => (
          <div key={index} className="tile" onClick={() => handleClick(index)}>
            {revealed[index] ? (
              <>
                <img
                  src={item === 'tiger' ? TIGER_ICON : BIRD_ICON}
                  alt={item}
                  className="character-img"
                />
              </>
            ) : (
              <>
                <div className="hidden-tile"></div>
                <span className="tile-number">{index + 1}</span>
              </>
            )}
          </div>
        ))}
      </div>

      <button className="restart-btn" onClick={handleStart}><strong>AGAIN</strong></button>
    </div>
  );
}

export default App;
