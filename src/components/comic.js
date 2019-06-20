import React, { Component } from 'react';
import './../App.css';

import { withRouter } from 'react-router-dom';
import ContentLoader from 'react-content-loader'

const MyLoader = () => (
  <ContentLoader primaryColor={"#1b1b1b"} secondaryColor={'#1e1e1e'} speed={1.25} width={400} height={190}>
    <rect x="142" y="5" rx="5" ry="5" width="115" height="30" />
    <rect x="125" y="47" rx="4" ry="4" width="149" height="140" />
  </ContentLoader>
)

class Comic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldUpdate: false,
      loaded: false,
    }
  }

  imageHasLoaded = () => {
    this.setState({
      loaded: true,
      shouldUpdate: false,
    })
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  	if(this.props.number!==nextProps.number) {
  		this.setState({
  			shouldUpdate: true,
        loaded: false,
  		})
  	}
  }

  componentDidUpdate() {
    if(this.state.shouldUpdate===true && this.props.shouldUpdateLock===false) {
      this.props.updateComicFn(this.props.number)
    }
  }

  render() {
    return (
        <div className="comic-wrapper">
          <div style={{display: this.state.loaded ? 'none' : 'initial'}}><MyLoader className={'loader'}/></div>
          <div className="title" style={{display: !this.state.loaded ? 'none' : 'initial'}}>{this.props.comic.title}</div>
          <img alt={this.props.comic.alt} src={this.props.url} style={{visibility: !this.state.loaded ? 'hidden' : 'visible'}} onLoad={this.imageHasLoaded}/>
        </div>
    );
  }
}

export default withRouter(Comic)