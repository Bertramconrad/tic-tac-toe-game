import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null), xIsNext: true };
  } */

  /* handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }
 */
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    //const status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    /* const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
 */
    return (
      <div>       
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      columnRef: '0',
      rowRef: '0',
      xIsNext: true,
    };
  }

  handleClick(i) {
    /* const history = this.state.history; */
    //console.log(this.state.history.map(item => item))
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    //console.log(current.squares);
    /* const squares = this.state.squares.slice(); */
    const squares = current.squares.slice();
    //console.log(squares[i])
    /*En caso de que exista un ganador entonces calculateWinner retornar?? un valor thruty como 'X' o 'O'.*/
    /*En caso de que squares[i] sea null entonces el usuario ha hecho clic sobre una opci??n a??n vac??a.*/
    /*En caso de que haya un ganador o haga clic sobre una celda ya llena, entonces saldr?? de la funci??n y la clase
    o componente Game*/
    if (calculateWinner(squares) || squares[i]) {   
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    let tmp_row;
    let tmp_col;
    if (i < 3) {
      tmp_row = 1
    } else if (i < 6) {
      tmp_row = 2
    } else tmp_row = 3;
    if (i in [0,3,6]) {
      tmp_col = 1
    } else if (i in [1,4,7]) {
      tmp_col = 2
    } else tmp_col = 3;
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      columnRef: tmp_col,
      rowRef: tmp_row,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    /*  const current = history[history.length - 1]; */
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    //console.log(winner)
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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

//console.log(squares)

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================
