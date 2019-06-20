import React, { Component } from 'react';
import './../App.css';

import Comic from './comic.js'
import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.updateComic = this.updateComic.bind(this)
    this.state = {
      comic: {img: '', num: -1},
      number: this.props.match.params.number ? this.props.match.params.number : '',
      shouldUpdateLock: true,
    }
  }

  fetchComic = (number) => {
    fetch(`https://xkcd.now.sh/${number}`).then((response) => {
      response.json().then((parsedJSON) => {
        const comic = parsedJSON;
        let url = comic.img;
        if(comic.hasOwnProperty('imgRetina')) {
          url = comic.imgRetina;
        }
        this.setState({
          comic: comic,
          url: url,
          shouldUpdateLock: true,
        }, ()=> {
          this.props.history.push(`/${comic.num}`);
        })
      })
    }).catch()
  }

  componentDidMount() {
    this.fetchComic(this.state.number)
    fetch("https://xkcd.now.sh/").then((response) => {
      response.json().then((parsedJSON) => {
        this.setState({
          upper: parsedJSON.num,
        })
      })
    })
  }

  updateComic = (number) => {
    this.fetchComic(number)
  }

  navigate = (option) => {
    if(option===42) {
      const random = Math.floor(Math.random() * (this.state.upper - 1 + 1) ) + 1;
      this.setState({
        number: random,
        shouldUpdateLock: false,
      })
    }
    else if(option===0 && this.state.number>=1) {
      this.setState({
        number: this.state.number===1? this.state.number : this.state.number-1,
        shouldUpdateLock: false,
      })
    } else if(option===-100) {
      this.setState({
        number: 1,
        shouldUpdateLock: false,
      })
    } else if(option===100) {
      this.setState({
        number: this.state.upper,
        shouldUpdateLock: false,
      })
    }
    else {
      this.setState({
        number: this.state.number+1 > this.state.upper ? this.state.upper : this.state.number+1,
        shouldUpdateLock: false,
      })
    }
  }

  render() {
    return (
      <div className="home is-unselectable">
        <p className="credit">All comics displayed here are Randall Munroe's creations, obtained from <a href="https://xkcd.com">xkcd.com</a>.<br/>
        For bug fixes/feature requests, head over to the <a href="https://github.com/jeremyphilemon/xkcd-dark">repository</a> here.</p>
        <div className="navigation">
          <button className="navigation-button" onClick={this.navigate.bind(null, -100)}>[First]</button>
          <button className="navigation-button" onClick={this.navigate.bind(null, 0)}>[Prev]</button>
          <button className="navigation-button" onClick={this.navigate.bind(null, 42)}>[Random]</button>
          <button className="navigation-button" onClick={this.navigate.bind(null, 1)}>[Next]</button>
          <button className="navigation-button" onClick={this.navigate.bind(null, 100)}>[Latest]</button>
        </div>
        <div className="comic">
          <Comic number={this.state.number} comic={this.state.comic} url={this.state.url} updateComicFn={this.updateComic} shouldUpdateLock={this.state.shouldUpdateLock}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);