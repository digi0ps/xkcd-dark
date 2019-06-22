import React from 'react';

const ComicDumb = props => (
  <div
    className="comic-wrapper"
    style={{ display: props.isLoading ? 'none' : 'initial' }}
  >
    <div className="title">{props.title}</div>
    <img alt={props.alt} src={props.url} onLoad={props.onLoadHandler} />
  </div>
);

export default ComicDumb;
