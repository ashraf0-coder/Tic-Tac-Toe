document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
  
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = cell.getAttribute("data-index");
  
      if (gameState[cellIndex] !== "" || !gameActive) {
        return;
      }
  
      gameState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add("taken");
  
      if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
      }
  
      if (!gameState.includes("")) {
        status.textContent = "It's a draw! 🤝";
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function checkWin() {
      return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return (
          gameState[a] === currentPlayer &&
          gameState[b] === currentPlayer &&
          gameState[c] === currentPlayer
        );
      });
    }
  
    function resetGame() {
      currentPlayer = "X";
      gameActive = true;
      gameState = ["", "", "", "", "", "", "", "", ""];
      status.textContent = `Player ${currentPlayer}'s turn`;
  
      const cells = document.querySelectorAll(".cell");
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
      });
    }
  
    function initializeBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
      }
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    initializeBoard();
    resetButton.addEventListener("click", resetGame);
  });
  