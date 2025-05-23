import { useEffect } from 'react'

export default function useSlide15Keyboard(game, handleMove) {
  useEffect(() => {
    function handleKeyDown(e) {
      const { playground, isSolved } = game
      if (isSolved) return

      const [emptyRow, emptyCol] = playground
        .flatMap((row, i) => row.map((val, j) => (val === 0 ? [i, j] : null)))
        .filter(Boolean)[0]

      const key = e.key.toLowerCase()
      const directions = {
        arrowup: [emptyRow + 1, emptyCol],
        w: [emptyRow + 1, emptyCol],

        arrowdown: [emptyRow - 1, emptyCol],
        s: [emptyRow - 1, emptyCol],

        arrowleft: [emptyRow, emptyCol + 1],
        a: [emptyRow, emptyCol + 1],

        arrowright: [emptyRow, emptyCol - 1],
        d: [emptyRow, emptyCol - 1],
      }

      const moveTarget = directions[key]
      if (!moveTarget) return

      const [targetRow, targetCol] = moveTarget
      if (targetRow >= 0 && targetRow < 4 && targetCol >= 0 && targetCol < 4) {
        handleMove(targetRow, targetCol)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [game, handleMove])
}
