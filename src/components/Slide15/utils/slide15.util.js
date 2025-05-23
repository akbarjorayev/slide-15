export function getEmptyIndexes(playground, target) {
  const [row_i, col_i] = target
  let empty_i = []

  // top
  if (playground[row_i - 1]) {
    if (playground[row_i - 1][col_i] === 0) empty_i = [row_i - 1, col_i]
  }
  // right
  if (playground[row_i][col_i + 1] === 0) empty_i = [row_i, col_i + 1]
  // bottom
  if (playground[row_i + 1]) {
    if (playground[row_i + 1][col_i] === 0) empty_i = [row_i + 1, col_i]
  }
  // left
  if (playground[row_i][col_i - 1] === 0) empty_i = [row_i, col_i - 1]

  return empty_i
}

export function getMovedPlayground(curPlayground, target, empty_i) {
  const [row_i, col_i] = target
  const targetNum = curPlayground[row_i][col_i]

  const newPlayground = curPlayground.map((row) => [...row])
  newPlayground[row_i][col_i] = 0

  const [e_row_i, e_col_i] = empty_i
  newPlayground[e_row_i][e_col_i] = targetNum

  return newPlayground
}

export function getRandomPlayground() {
  const unused = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0])
  const playground = [[], [], [], []]

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const randomNum = Math.floor(Math.random() * unused.size)
      const num = Array.from(unused)[randomNum]
      unused.delete(num)
      playground[i][j] = num
    }
  }

  return playground
}

export function isSolved(playground) {
  const solvedPlayground = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ].flat()
  const flatPlayground = playground.flat()

  for (let i = 0; i < flatPlayground.length; i++) {
    if (flatPlayground[i] !== solvedPlayground[i]) return false
  }
  return true
}
