import React, { Component } from 'react';
import './../App.css';

import { withRouter } from 'react-router-dom';

class Comic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: {img: ''},
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
          shouldUpdate: false,
        }, ()=> {
          this.props.sendNumberToParent(comic.num);
          this.props.history.push(`/${comic.num}`)
        })
      })
    }).catch(console.log("Could not fetch the comic :/"))
  }

  componentDidMount() {
    this.fetchComic(this.props.number)
  }

  componentWillReceiveProps(nextProps) {
  	if(this.props.number!==nextProps.number) {
  		this.setState({
  			shouldUpdate: true,
  		})
  	}
  }

  componentDidUpdate() {
    if(this.state.shouldUpdate===true) {
      this.fetchComic(this.props.number)
    }
  }

  render() {
    return (
        <div className="">
          <div className="title">{this.state.comic.title}</div>
          <img alt={this.state.comic.alt} src={this.state.url}/>
        </div>
    );
  }
}

export default withRouter(Comic);