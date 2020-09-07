import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }

  return null;
}

function Square(props) {
  return (
    <button
      className={`square ${props.isHighlighted ? "is-highlighted" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const line = this.props.highlight || [];

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
        isHighlighted={line.includes(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {[...Array(3).keys()].map((i) => {
          return (
            <div className="board-row" key={i}>
              {[...Array(3).keys()].map((j) => this.renderSquare(i * 3 + j))}
            </div>
          );
        })}
      </div>
    );
  }
}

const GRID_LENGTH = 3;
const GRID_SIZE = GRID_LENGTH * GRID_LENGTH;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(GRID_SIZE).fill(null),
          row: null,
          col: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscent: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calcWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    const col = Math.floor(i / GRID_LENGTH);
    const row = i % GRID_LENGTH;
    this.setState({
      history: history.concat([{ squares, col, row }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  toggleAscent() {
    this.setState({ isAscent: !this.state.isAscent });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, line } = calcWinner(current.squares) || {};

    let moves = history.map((step, move) => {
      // const desc = move ? "Go to move #" + move : "Go to game start";
      const desc = move
        ? `Go to move #${move} (${step.col}, ${step.row})`
        : "Go to game start";
      const getPreviewCell = (v) => (
        <div className="preview-cell" key={v}>
          {step.squares[v]}
        </div>
      );

      return (
        <li className="history-item" key={move}>
          <button onClick={() => this.jumpTo(move)}>
            <span className={this.state.stepNumber === move ? "desc-bold" : ""}>
              {desc}
            </span>
          </button>

          <div className="history-preview">
            {[...Array(9).keys()].map((i) => getPreviewCell(i))}
          </div>
        </li>
      );
    });
    if (this.state.isAscent) {
      moves = [...moves].reverse();
    }

    let status = "";
    if (winner) {
      status = "Winner: " + winner;
    } else if (this.state.stepNumber === GRID_SIZE) {
      status = "Draw!";
    } else {
      const nextPlayer = this.state.xIsNext ? "X" : "O";
      status = `Next player: ${nextPlayer}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            highlight={line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleAscent()}>Toggle reversed</button>
          <ol reversed={this.state.isAscent}>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
