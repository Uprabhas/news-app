import React, { Component } from 'react'
import './Newsitem.css';

export class Newsitem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card my-2 " >
          <div className="n" style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}} >
          <span className='badge rounded-pill bg-danger' >{source}</span>
          </div>
          <img src={!imageUrl ? "https://source.unsplash.com/collection/190725/1600x900" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}..</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "unknown" : author} on {date}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div > 
    )
  }
}

export default Newsitem
