import React, { Component } from 'react';
import './../App.css';

import Comic from './comic';
import Loader from './loader';
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
      loading: true,
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
    this.setState({
      loading: true,
    });
    const comic = await api.fetchNumber(number).catch();
    this.setComic(comic);
  };

  preload(number, upper) {
    if (number && number < upper) {
      api.fetchNumber(number + 1);
    }
    if (number && number > 1) {
      api.fetchNumber(number - 1);
    }
  }

  async componentDidMount() {
    const latestcomic = await api.fetchToday();

    this.setState({
      upper: latestcomic.num,
    });

    const { number, upper } = this.state;

    if (this.state.number) {
      await this.fetchComic(this.state.number);
    } else {
      this.setComic(latestcomic);
    }

    this.preload(number, upper);
  }

  async componentWillUpdate(nextProps, { number, upper }) {
    if (this.state.number !== number) {
      await this.fetchComic(number);
      this.preload(number, upper);
    }
  }

  navigate = option => () => {
    const { number, upper } = this.state;

    if (option === 'random') {
      const random = Math.floor(Math.random() * (upper - 1 + 1)) + 1;
      this.setState({
        number: random,
      });
    } else if (option === 'prev' && number > 1) {
      this.setState({
        number: number - 1,
      });
    } else if (option === 'first') {
      this.setState({
        number: 1,
      });
    } else if (option === 'latest' && number !== upper) {
      this.setState({
        number: upper,
      });
    } else if (option === 'next' && number < upper) {
      this.setState({
        number: number + 1,
      });
    }
  };

  onLoadHandler = () => {
    this.setState({
      loading: false,
    });
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
            {...this.state.comic}
            isLoading={this.state.loading}
            onLoadHandler={this.onLoadHandler}
          />
          {this.state.loading ? <Loader /> : null}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
