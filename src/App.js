import React, { useState, useEffect } from 'react';
import './App.css';

const TIGER_ICON = process.env.PUBLIC_URL + '/tiger.png';
const BIRD_ICON = process.env.PUBLIC_URL + '/bird.png';

const generateBoard = (size = 36) => {
  const choices = ['tiger', 'bird'];
  return Array.from({ length: size }, () => choices[Math.floor(Math.random() * 2)]);
};

function App() {
  const [board, setBoard] = useState(generateBoard());
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [turn, setTurn] = useState('tiger');
  const [tigerScore, setTigerScore] = useState(0);
  const [birdScore, setBirdScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const tigerTotal = board.filter(item => item === 'tiger').length;
    const birdTotal = board.filter(item => item === 'bird').length;

    if (tigerScore === tigerTotal) {
      setGameOver(true);
    } else if (birdScore === birdTotal) {
      setGameOver(true);
    }
  }, [tigerScore, birdScore, board]);

  const handleStart = () => {
    setBoard(generateBoard());
    setRevealed(Array(36).fill(false));
    setTurn('tiger');
    setTigerScore(0);
    setBirdScore(0);
    setGameOver(false);
  };

  const handleClick = (index) => {
    if (gameOver || revealed[index]) return;

    const revealedCopy = [...revealed];
    revealedCopy[index] = true;
    setRevealed(revealedCopy);

    if (board[index] === turn) {
      if (turn === 'tiger') {
        setTigerScore(score => score + 1);
      } else {
        setBirdScore(score => score + 1);
      }
    } else {
      setGameOver(true);
      return;
    }

    setTurn(prev => (prev === 'tiger' ? 'bird' : 'tiger'));
  };

  const getWinnerText = () => {
    if (tigerScore === board.filter(i => i === 'tiger').length) {
      return "Winner is TIGER!";
    }
    if (birdScore === board.filter(i => i === 'bird').length || (gameOver && turn === 'tiger')) {
      return "Winner is BIRD!";
    }
    if (gameOver) {
      return turn === 'tiger'
        ? "Winner is BIRD!"
        : "Winner is TIGER!";
    }
    return '';
  };

  return (
    <div className={`container ${gameOver ? 'game-over' : turn === 'tiger' ? 'tiger-turn' : 'bird-turn'}`}>
      <div className="scoreboard">
        <h3>[ Scoreboard ]</h3>
        <p>| Turn: <strong>{turn === 'tiger' ? 'TIGER' : 'BIRD'}</strong></p>
        <p>| Tiger Score: {tigerScore}</p>
        <p>| Bird Score: {birdScore}</p>
      </div>

      <h1 className="title">Tiger vs Bird (Kpop Demon Hunters)</h1>

      <p className="inst">
        <strong>Minesweeper Instructions:</strong> <br />
        - Players take turns. <br />
        - <strong>TIGER</strong> goes first, then <strong>BIRD.</strong><br />
        - First to complete all their tiles wins.
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
              <img
                src={item === 'tiger' ? TIGER_ICON : BIRD_ICON}
                alt={item}
                className="character-img"
              />
            ) : (
              <div className="hidden-tile"></div>
            )}
          </div>
        ))}
      </div>

      <button className="restart-btn" onClick={handleStart}><strong>AGAIN</strong></button>
    </div>
  );
}

export default App;