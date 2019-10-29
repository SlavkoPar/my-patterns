import React, { useState, useEffect } from 'react';


const GameStatus = {
	NEW: 'NEW',
	CHALLENGE: 'CHALLENGE',
	PLAYING: 'PLAYING',
	WON: 'WON',
	LOST: 'LOST',
 };
 
 const CellStatus = {
	NORMAL: 'white',
	HIGHLIGHT: 'lightblue',
	CORRECT: 'lightgreen',
	WRONG: 'pink',
 };
 
 const Messages = {
	NEW: 'You will have a few seconds to memorize the blue random cells',
	CHALLENGE: 'Remember these blue cells now',
	PLAYING: 'Which cells were blue?',
	WON: 'Victory!',
	LOST: 'Game Over',
 };
 
 const Cell = ({ width, gameStatus, isChallenge, isPicked, onClick }) => {
	let cellStatus = CellStatus.NORMAL;
	if (gameStatus !== GameStatus.NEW) {
	  if (isPicked) {
		 cellStatus = isChallenge ? CellStatus.CORRECT : CellStatus.WRONG;
	  } else if (
		 isChallenge &&
		 (gameStatus === GameStatus.CHALLENGE || gameStatus === GameStatus.LOST)
	  ) {
		 cellStatus = CellStatus.HIGHLIGHT;
	  }
	}
	return (
	  <div
		 className="cell"
		 style={{ width: `${width}%`, backgroundColor: cellStatus }}
		 onClick={onClick}
	  />
	);
 };
 
 const Footer = ({ gameStatus, countdown, startGame, resetGame }) => {
	const buttonAreaContent = () => {
	  switch(gameStatus) {
		case GameStatus.NEW:
			return <button onClick={startGame}>Start Game</button>;

		case GameStatus.CALLENGE: // eslint-disable-next-line no-fallthrough
		case GameStatus.PLAYING:
			return countdown;

		case GameStatus.WON: // eslint-disable-next-line no-fallthrough
		case GameStatus.LOST:
			return <button onClick={resetGame}>Play Again</button>;
		
		default:
			break;
	  }
	};
	return (
	  <>
		 <div className="message">{Messages[gameStatus]}</div>
		 <div className="button">{buttonAreaContent()}</div>
	  </>
	);
 };
	
 const GameSession = ({
	cellIds,
	challengeCellIds,
	cellWidth,
	challengeSize,
	challengeSeconds,
	playSeconds,
	maxWrongAttempts,
	autoStart,
	resetGame,
 }) => {
	const [gameStatus, setGameStatus] = useState(
	  autoStart ? GameStatus.CHALLENGE : GameStatus.NEW
	);
	const [pickedCellIds, setPickedCellIds] = useState([]);
	const [countdown, setCountdown] = useState(playSeconds);
	
	useEffect(() => {
	  let timerId;
	  if (gameStatus === GameStatus.CHALLENGE) {
		 timerId = setTimeout(
			() => setGameStatus(GameStatus.PLAYING),
			1000 * challengeSeconds
		 );
	  }
	  if (gameStatus === GameStatus.PLAYING) {
		 timerId = setInterval(() => {
			setCountdown(countdown => {
			  if (countdown === 1) {
				 clearTimeout(timerId);
				 setGameStatus(GameStatus.LOST);
			  }
			  return countdown - 1;
			});
		 }, 1000);
	  }
	  return () => clearTimeout(timerId);
	}, [challengeSeconds, gameStatus]);  
	
	useEffect(() => {
	  const [correctPicks, wrongPicks] = utils.arrayCrossCounts(
		 pickedCellIds,
		 challengeCellIds
	  );
	  if (correctPicks === challengeSize) {
		 setGameStatus(GameStatus.WON);
	  }
	  if (wrongPicks === maxWrongAttempts) {
		 setGameStatus(GameStatus.LOST);
	  }
	}, [pickedCellIds, challengeCellIds, challengeSize, maxWrongAttempts]); // [pickedCellIds] eslint asked for it
	
	const pickCell = cellId => {
	  if (gameStatus === GameStatus.PLAYING) {
		 setPickedCellIds(pickedCellIds => {
			if (pickedCellIds.includes(cellId)) {
			  return pickedCellIds;
			}
			return [...pickedCellIds, cellId];
		 });
	  }
	};  
	
	return (
	  <div className="game">
		 <div className="grid">
			{cellIds.map(cellId => (
			  <Cell 
				 key={cellId} 
				 width={cellWidth}
				 gameStatus={gameStatus}
				 isChallenge={challengeCellIds.includes(cellId)}
				 isPicked={pickedCellIds.includes(cellId)}
				 onClick={() => pickCell(cellId)}
				 />
			))}
		 </div>
		 <Footer
			gameStatus={gameStatus}
			countdown={countdown}
			startGame={() => setGameStatus(GameStatus.CHALLENGE)}
			resetGame={resetGame}
		 />
	  </div>
	);
 };
 
 const useGameId = () => {
	const [gameId, setGameId] = useState(1);
 
	return {
	  gameId,
	  isNewGame: gameId === 1,
	  renewGame: () => setGameId(gameId => gameId + 1),
	};
 };
 
 const Game = () => {
	const { isNewGame, renewGame } = useGameId();  // { gameId, 
 
	const gridSize = 5;
	const challengeSize = 6;
	const cellIds = utils.createArray(gridSize * gridSize);
	const cellWidth = 100 / gridSize;
	const challengeCellIds = utils.sampleArray(cellIds, challengeSize);
	
	return (
	  <GameSession
		 cellIds={cellIds}
		 challengeCellIds={challengeCellIds}
		 cellWidth={cellWidth}
		 challengeSize={challengeSize}
		 challengeSeconds={3}
		 playSeconds={10}
		 maxWrongAttempts={3}
		 autoStart={!isNewGame}
		 resetGame={renewGame}
	  />
	);
 };
 
 // Math science
 const utils = {
	/* Create an array based on a numeric size property.
		Example: createArray(5) => [0, 1, 2, 3, 4] */
	createArray: size => Array.from({ length: size }, (_, i) => i),
 
	/* Pick random elements from origArray up to sampleSize
		And use them to form a new array.
		Example: sampleArray([9, 12, 4, 7, 5], 3) => [12, 7, 5] */
	sampleArray: (origArray, sampleSize) => {
	  const copy = origArray.slice(0);
	  const sample = [];
	  for (let i = 0; i < sampleSize && i < copy.length; i++) {
		 const index = Math.floor(Math.random() * copy.length);
		 sample.push(copy.splice(index, 1)[0]);
	  }
	  return sample;
	},
 
	/* Given a srcArray and a crossArray, count how many elements 
		in srcArray exist or do not exist in crossArray.
		Returns an array like [includeCount, excludeCount]
		Example: arrayCrossCounts([0, 1, 2, 3, 4], [1, 3, 5]) => [2, 3] */
	arrayCrossCounts: (srcArray, crossArray) => {
	  let includeCount = 0;
	  let excludeCount = 0;
	  srcLoop: for (let s = 0; s < srcArray.length; s++) {
		 for (let c = 0; c < crossArray.length; c++) {
			if (crossArray[c] === srcArray[s]) {
			  includeCount += 1;
			  continue srcLoop;
			}
		 }
		 excludeCount += 1;
	  }
	  return [includeCount, excludeCount];
	},
 };
 
 
 export  { Game }