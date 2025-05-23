import { useState } from 'react'
import useSlide15Keyboard from '../../hooks/useSlide15Keyboard'
import {
  getEmptyIndexes,
  getMovedPlayground,
  getRandomPlayground,
  isSolved,
} from './utils/slide15.util'
import RefreshIcon from '../../assets/svgs/refresh.svg?react'
import './Slide15.css'

export default function Slide15() {
  const [game, setGame] = useState({
    playground: getRandomPlayground(),
    isSolved: false,
  })
  useSlide15Keyboard(game, handleMove)

  function handleMove(row_i, col_i) {
    if (!game.playground[row_i][col_i]) return

    const empty_i = getEmptyIndexes(game.playground, [row_i, col_i])
    if (!empty_i.length) return

    const newPlayground = getMovedPlayground(
      game.playground,
      [row_i, col_i],
      empty_i
    )

    const solved = isSolved(newPlayground)
    setGame({
      ...game,
      playground: newPlayground,
      isSolved: solved,
    })
  }

  function renewGame() {
    setGame({
      playground: getRandomPlayground(),
      isSolved: false,
    })
  }

  return (
    <>
      <div className="game_area">
        <div className="slide_15_area" isSolved={game.isSolved ? 'true' : ''}>
          {game.playground?.map((row, row_i) =>
            row?.map((col, col_i) => (
              <div
                key={col_i}
                className="slide_15_square"
                onClick={() => handleMove(row_i, col_i)}
              >
                {col || ''}
              </div>
            ))
          )}
        </div>
        <button className="slide_15_btn" onClick={renewGame}>
          <RefreshIcon />
        </button>
      </div>
    </>
  )
}
