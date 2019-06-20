import React, { Component } from 'react';
import './../App.css';

import Comic from './comic.js'
import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.match.params.number ? this.props.match.params.number : '',
    }
    this.getLatestNumber = this.getLatestNumber.bind(this);
  }

  componentDidMount() {

  }

  getLatestNumber = (latestNumber) => {
    this.setState({
      number: latestNumber,
    })
  }

  navigate = (option) => {
    if(option===0 && this.state.number>1) {
      this.setState({
        number: this.state.number-1,
      })
    } else if(option===-100) {
      this.setState({
        number: 1,
      })
    } else if(option===100) {
      this.props.history.push('/');
    }
    else {
      this.setState({
        number: this.state.number+1,
      })
    }
  }

  render() {
    return (
      <div className="home">
        <div className="navigation">
          <div className="navigation-button" onClick={this.navigate.bind(null, -100)}>[First]</div>
          <div className="navigation-button" onClick={this.navigate.bind(null, 0)}>[Prev]</div>
          <div className="navigation-button" onClick={this.navigate.bind(null, 1)}>[Next]</div>
          <div className="navigation-button" onClick={this.navigate.bind(null, 100)}>[Latest]</div>
        </div>
        <div className="comic">
          <Comic number={this.state.number} sendNumberToParent={this.getLatestNumber}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);