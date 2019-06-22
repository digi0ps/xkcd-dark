import React, { Component } from 'react';
import './../App.css';

import Comic from './comic.js';
import Navigation from './navigation';
import * as api from '../helpers/api';

import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    // Deconstruct passed props instead of this.props
    const {
      match: { params },
    } = props;

    this.state = {
      comic: { img: '', num: -1 },
      number: Number(params.number) || '',
      shouldUpdateLock: true,
    };
  }

  setComic = comic => {
    let url = comic.imgRetina || comic.img;

    this.setState(
      {
        comic,
        url,
        shouldUpdateLock: true,
      },
      () => {
        this.props.history.push(`/${comic.num}`);
      }
    );
  };

  fetchComic = async number => {
    const comic = await api.fetchNumber(number).catch();
    this.setComic(comic);
  };

  async componentDidMount() {
    const latestcomic = await api.fetchToday();

    this.setState({
      upper: latestcomic.num,
    });

    if (this.state.number) {
      this.fetchComic(this.state.number);
    } else {
      this.setComic(latestcomic);
    }
  }

  navigate = option => () => {
    const { number, upper } = this.state;

    if (option === 'random') {
      const random = Math.floor(Math.random() * (upper - 1 + 1)) + 1;
      this.setState({
        number: random,
        shouldUpdateLock: false,
      });
    } else if (option === 'prev' && number > 1) {
      this.setState({
        number: number - 1,
        shouldUpdateLock: false,
      });
    } else if (option === 'first') {
      this.setState({
        number: 1,
        shouldUpdateLock: false,
      });
    } else if (option === 'latest' && number !== upper) {
      this.setState({
        number: upper,
        shouldUpdateLock: false,
      });
    } else if (option === 'next' && number < upper) {
      this.setState({
        number: number + 1,
        shouldUpdateLock: false,
      });
    }
  };

  render() {
    return (
      <div className="home is-unselectable">
        <p className="credit">
          All comics displayed here are Randall Munroe's creations, obtained
          from <a href="https://xkcd.com">xkcd.com</a>.<br />
          For bug fixes/feature requests, head over to the{' '}
          <a href="https://github.com/jeremyphilemon/xkcd-dark">
            repository
          </a>{' '}
          here.
        </p>

        <Navigation navigate={this.navigate} />

        <div className="comic">
          <Comic
            number={this.state.number}
            comic={this.state.comic}
            url={this.state.url}
            updateComicFn={this.fetchComic}
            shouldUpdateLock={this.state.shouldUpdateLock}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
