import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      guessedCorrect: new Set(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  handleRestart() {
    this.setState((st) => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    }));
  }
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      guessedCorrect: st.answer.includes(ltr)
        ? st.guessedCorrect.add(ltr)
        : st.guessedCorrect,
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    if (this.state.nWrong < this.props.maxWrong) {
      if (this.guessedWord().join("") === this.state.answer) {
        return (
          <div>
            <p id="result">Congratulations!!! You Win :)</p>
          </div>
        );
      } else {
        return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
          <button
            key={ltr}
            value={ltr}
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(ltr)}
          >
            {ltr}
          </button>
        ));
      }
    } else {
      return (
        <div>
          <p id="result">Game Over!!! You Lose :(</p>
          <p>The word was : {this.state.answer}</p>
        </div>
      );
    }
  }

  /** render: render game */
  render() {
    const altText = `${this.state.nWrong}/${this.props.maxWrong} Guesses`;
    return (
      <div className="Hangman">
        <div className="Hangman__Left">
          <img src={this.props.images[this.state.nWrong]} alt={altText} />
          <p>Wrong Guesses: {this.state.nWrong}</p>
          <p className="Hangman-word">{this.guessedWord()}</p>
        </div>
        <div className="Hangman__right">
          <p className="Hangman-btns">{this.generateButtons()}</p>
          <button className="restart" onClick={this.handleRestart}>
            Restart Game
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
